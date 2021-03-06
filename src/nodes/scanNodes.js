const scanNodes = {
    'Seq Scan': {
        text: `This is the simplest way of fetching data from a table: it scans through every page of data sequentially. Like most other scans, this can apply a filter while reading data, but it needs to read the data first and then discard it. A sequential scan has no way to zero in on just the data you want: it always reads everything in the table. This is generally inefficient unless you need a large proportion of the table to answer your query, but is always available and sometimes may be the only option.`,
        link: 'https://pganalyze.com/docs/explain/scan-nodes/sequential-scan',
        color: '#FF5722',
    },
    'Index Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/index-scan',
        text: `An index scan uses an index to find either a specific row, or all rows matching a predicate. An index scan will either look up a single row at a time (for a query like WHERE id = 1234, or as the inner table in a nested loop, looking up the row matching the current outer row), or scan through a section of the table in order. An index scan must first look up each row in the index, and then check the actual table data for that index entry. The table data must be checked to ensure that the row it found is actually visible to the current transaction, and also to fetch any columns included in the query that are not present in the index. Because of this, an index scan actually has higher per-row overhead than a sequential scan: its real advantage is that it allows you to read only some of the rows in a table. If your query predicate is not very selective (that is, if few rows are filtered out), a sequential scan may still be more efficient than an index scan.

        If your query predicate matches the index exactly, the scan will retrieve just the matching rows. If you have an additional predicate in your query, the index scan can filter rows as it’s reading them, just like a sequential scan.`,
    },
    'Index Only Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/index-only-scan',
        text: `This is very similar to an Index Scan, but the data comes directly from the index and the visibility check is handled specially, so it can avoid looking at the table data entirely. An index-only scan is faster, but it’s not always available as an alternative to a regular index scan. It has two restrictions: the index type must support Index-Only Scans (the common btree index type always does) and (somewhat obviously) the query must only project columns included in the index. If you have a SELECT * query but don’t actually need all columns, you may be able to use an index-only scan just by changing the column list.`,
    },
    'Bitmap Heap Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/bitmap-heap-scan',
        text: `A bitmap heap scan takes a row location bitmap generated by a Bitmap Index Scan (either directly, or through a series of bitmap set operations via BitmapAnd and BitmapOr nodes) and looks up the relevant data. Each chunk of a bitmap can either be exact (pointing directly to rows) or lossy (pointing to a page containing at least one row matching the predicate).

        Postgres prefers using exact blocks, but if limited work_mem is an issue, it will start using lossy blocks as well. The blocks are actually produced as lossy or exact by children of the bitmap heap scan, but that status is more relevant when the blocks are processed to fetch rows, so it is reflected in the Bitmap Heap Scan. If a bitmap block is lossy, the node will need to fetch the entire page, and re-check the specified index condition (since it doesn’t know which rows on the page are needed).`,
    },
    'Bitmap Index Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/bitmap-index-scan',
        text: `You can think of a bitmap index scan as a middle ground between a sequential scan and an index scan. Like an index scan, it scans an index to determine exactly what data it needs to fetch, but like a sequential scan, it takes advantage of data being easier to read in bulk.

        The bitmap index scan actually operates in tandem with a Bitmap Heap Scan: it does not fetch the data itself. Instead of producing the rows directly, the bitmap index scan constructs a bitmap of potential row locations. It feeds this data to a parent Bitmap Heap Scan, which can decode the bitmap to fetch the underlying data, grabbing data page by page.
        
        A Bitmap Heap Scan is the most common parent node of a Bitmap Index Scan, but a plan may also combine several different Bitmap Index Scans with BitmapAnd or BitmapOr nodes before actually fetching the underlying data. This allows Postgres to use two different indexes at once to execute a query.`,
    },
    'CTE Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/cte-scan',
        text: `Scan the result of a common table expression. Note that until Postgres 12, common table expressions are an optimization fence; the CTE result is materialized, and is essentially treated as a temporary table and not optimized as part of the query. If you depend on this behavior, be aware performance of your queries may change when you upgrade.`,
    },
    'Custom Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/custom-scan',
        text: `Scan using a custom scan implementation, which can be added as a separate module and plug into standard Postgres query planning and execution.`,
    },
    'Foreign Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/foreign-scan',
        text: `Scan on a Foreign Table.`,
    },
    'Function Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/function-scan',
        text: `Scans the result of a set-returning function (like unnest or regexp_split_to_table).`,
    },
    'Subquery Scan': {
        text: `A Subquery Scan is for scanning the output of a sub-query in the range table. We often need an extra plan node above the sub-query's plan to perform expression evaluations (which we can't push into the sub-query without risking changing its semantics).`,
        link: 'https://pganalyze.com/docs/explain/scan-nodes/subquery-scan'
    },
    'Table Sample Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/table-sample-scan',
        text: `Scan a table when the TABLESAMPLE feature is used. Note that this clause does change the semantics of your query, but if you’re looking to gather some statistics about data in a large table, it can be a lot more efficient than a full sequential scan.`,
    },
    'Tid Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/tid-scan',
        text: `Similar to an Index Scan, but one that can only look up rows using the internal and unstable ctid identifier. You are unlikely to use this type of scan in your queries.`,
    },
    'Values Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/values-scan',
        text: `Scan the literal VALUES clause.`,
    },
    'Work Table Scan': {
        link: 'https://pganalyze.com/docs/explain/scan-nodes/work-table-scan',
        text: `Scans the work table used in evaluating a recursive common table expression.`,
    },
};

export default scanNodes;


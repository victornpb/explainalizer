const otherNodes = {
    'Aggregate': {
        link: 'https://pganalyze.com/docs/explain/other-nodes/aggregate',
        text: `An Agg node implements plain or grouped aggregation. For grouped aggregation, Postgres can work with presorted input or unsorted input; the latter strategy uses an internal hashtable.`,
    },
    'Append': {
        text: `Generate the concatenation of the results of sub-plans. For example, this can be used for a UNION ALL query.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/append',
    },
    'Append': {
        text: `Generate the concatenation of the results of sub-plans. For example, this can be used for a UNION ALL query.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/append',
    },
    'Bitmap And': {
        text: `Generate a bitmap of the intersection of two physical row location bitmaps (that is, only locations that occur in both bitmaps). The bitmaps can come from Bitmap Index Scans or other BitmapOr or BitmapAnd child nodes.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/bitmap-and',
    },
    'Bitmap Or': {
        text: `Generate a bitmap of the union of two physical row location bitmaps (that is, locations that occur in either bitmap). The bitmaps can come from Bitmap Index Scans or other BitmapOr or BitmapAnd child nodes.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/bitmap-or',
    },
    'Gather Merge': {
        text: `Merge the results of pre-sorted worker outputs—similar to the Merge Append node.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/gather-merge',
    },
    'Gather': {
        text: `Gather data from multiple workers—similar to the Append node.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/gather',
    },
    'Group': {
        text: `Used for queries with GROUP BY (but no aggregates) specified. The input must be presorted according to the grouping columns.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/group',
    },
    'Hash': {
        text: `Reads data into a hash table, where it can easily be looked up by the hash key. This is used for hash joins and hash aggregates.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/hash',
    },
    'Limit': {
        text: `Takes data from a child node and produces sorted output, using either memory if available (depending on the work_mem setting) or “spilling” to disk. This is obviously necessary if the output needs to be sorted, though sometimes the input can be scanned in an already-sorted manner instead—e.g., if scanning a btree index compatible with the desired sort order.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/limit',
    },
    'Lock Rows': {
        text: `Executes the locking behavior of a FOR UPDATE clause.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/lock-rows',
    },
    'Materialize': {
        text: `Materialize the result of its child node in memory (to avoid re-computing the values).`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/materialize',
    },
    'Merge Append': {
        text: `Merge the results of pre-sorted sub-plans to preserve the ordering.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/merge-append',
    },
    'Modify Table (Delete, Insert, Update)': {
        text: `Apply rows produced by a subplan to a result table by inserting, updating, or deleting rows corresponding to the input.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/modify-table',
    },
    'Project Set': {
        text: `Apply a projection that includes set-returning functions to the output tuples of the outer plan.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/project-set',
    },
    'Recursive Union': {
        text: `Generate a recursive union of two sub-plans. This is used in evaluating recursive common table expressions.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/recursive-union',
    },
    'Result': {
        text: `If no outer plan, evaluate a variable-free targetlist. If outer plan, return tuples from outer plan (after a level of projection as shown by targetlist). If resconstantqual isn't NULL, it represents a one-time qualification test (i.e., one that doesn't depend on any variables from the outer plan, so needs to be evaluated only once).`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/result',
    },
    'SetOp': {
        text: `Combines two datasets for set operations like UNION, INTERSECT, and EXCEPT. Note that the query structure for SetOps is different than you may expect: rather than being the direct parent of the sets on which it operates, a SetOp node only has a single Append child, which has a Subquery Scan for each node to combine.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/set-op',
    },
    'Sort': {
        text: `Takes data from a child node and produces sorted output, using either memory if available (depending on the work_mem setting) or “spilling” to disk. This is obviously necessary if the output needs to be sorted, though sometimes the input can be scanned in an already-sorted manner instead—e.g., if scanning a btree index compatible with the desired sort order.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/sort',
    },
    'Unique': {
        text: `Like the UNIX command uniq, takes sorted input and eliminates adjacent duplicates. Useful for DISTINCT clauses if the input is already sorted (e.g., the query also includes an ORDER BY).`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/unique',
    },
    'Window Aggregate': {
        text: `Implements aggregation in window functions.`,
        link: 'https://pganalyze.com/docs/explain/other-nodes/window-aggregate',
    },
};

export default otherNodes;
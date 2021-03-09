const joinNodes = {
    'Hash Join': {
        link: 'https://pganalyze.com/docs/explain/join-nodes/hash-join',
        text: `Build a hash table from the inner table, keyed by the join key. Then scan the outer table, checking if a corresponding value is present. If the hash table would exceed work_mem, this process needs to happen in several batches writing temporary files to disk, which becomes dramatically slower.`,
    },
    'Merge Join': {
        link: 'https://pganalyze.com/docs/explain/join-nodes/merge-join',
        text: `Joins two children already sorted by their shared join key. This only needs to scan each relation once, but both inputs need to be sorted by the join key first (or scanned in a way that produces already-sorted output, like an index scan matching the required sort order).`,
    },
    'Nested Loop Join': {
        link: 'https://pganalyze.com/docs/explain/join-nodes/nested-loop',
        text: `For each row in the outer table, iterate through all the rows in the inner table and see if they match the join condition. If the inner relation can be scanned with an index, that can improve the performance of a Nested Loop Join. This is generally an inefficient way to process joins but is always available and sometimes may be the only option.`,
    },
};

export default joinNodes;
export default [
    {
      "Plan": {
        "Node Type": "Sort",
        "Parallel Aware": false,
        "Startup Cost": 482.81,
        "Total Cost": 485.31,
        "Plan Rows": 1000,
        "Plan Width": 524,
        "Sort Key": ["\"*SELECT* 1\".title"],
        "Plans": [
          {
            "Node Type": "SetOp",
            "Strategy": "Hashed",
            "Parent Relationship": "Outer",
            "Parallel Aware": false,
            "Command": "Except",
            "Startup Cost": 0.00,
            "Total Cost": 432.98,
            "Plan Rows": 1000,
            "Plan Width": 524,
            "Plans": [
              {
                "Node Type": "Append",
                "Parent Relationship": "Outer",
                "Parallel Aware": false,
                "Startup Cost": 0.00,
                "Total Cost": 405.08,
                "Plan Rows": 5581,
                "Plan Width": 524,
                "Plans": [
                  {
                    "Node Type": "Subquery Scan",
                    "Parent Relationship": "Member",
                    "Parallel Aware": false,
                    "Alias": "*SELECT* 1",
                    "Startup Cost": 0.00,
                    "Total Cost": 74.00,
                    "Plan Rows": 1000,
                    "Plan Width": 23,
                    "Plans": [
                      {
                        "Node Type": "Seq Scan",
                        "Parent Relationship": "Subquery",
                        "Parallel Aware": false,
                        "Relation Name": "film",
                        "Alias": "film",
                        "Startup Cost": 0.00,
                        "Total Cost": 64.00,
                        "Plan Rows": 1000,
                        "Plan Width": 19
                      }
                    ]
                  },
                  {
                    "Node Type": "Subquery Scan",
                    "Parent Relationship": "Member",
                    "Parallel Aware": false,
                    "Alias": "*SELECT* 2",
                    "Startup Cost": 228.01,
                    "Total Cost": 331.08,
                    "Plan Rows": 4581,
                    "Plan Width": 23,
                    "Plans": [
                      {
                        "Node Type": "Aggregate",
                        "Strategy": "Hashed",
                        "Partial Mode": "Simple",
                        "Parent Relationship": "Subquery",
                        "Parallel Aware": false,
                        "Startup Cost": 228.01,
                        "Total Cost": 273.82,
                        "Plan Rows": 4581,
                        "Plan Width": 17,
                        "Group Key": ["inventory.film_id", "film_1.title"],
                        "Plans": [
                          {
                            "Node Type": "Hash Join",
                            "Parent Relationship": "Outer",
                            "Parallel Aware": false,
                            "Join Type": "Inner",
                            "Startup Cost": 76.50,
                            "Total Cost": 205.10,
                            "Plan Rows": 4581,
                            "Plan Width": 17,
                            "Inner Unique": true,
                            "Hash Cond": "(inventory.film_id = film_1.film_id)",
                            "Plans": [
                              {
                                "Node Type": "Seq Scan",
                                "Parent Relationship": "Outer",
                                "Parallel Aware": false,
                                "Relation Name": "inventory",
                                "Alias": "inventory",
                                "Startup Cost": 0.00,
                                "Total Cost": 70.81,
                                "Plan Rows": 4581,
                                "Plan Width": 2
                              },
                              {
                                "Node Type": "Hash",
                                "Parent Relationship": "Inner",
                                "Parallel Aware": false,
                                "Startup Cost": 64.00,
                                "Total Cost": 64.00,
                                "Plan Rows": 1000,
                                "Plan Width": 19,
                                "Plans": [
                                  {
                                    "Node Type": "Seq Scan",
                                    "Parent Relationship": "Outer",
                                    "Parallel Aware": false,
                                    "Relation Name": "film",
                                    "Alias": "film_1",
                                    "Startup Cost": 0.00,
                                    "Total Cost": 64.00,
                                    "Plan Rows": 1000,
                                    "Plan Width": 19
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ];
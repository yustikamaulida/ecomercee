const express = require('express');
const router = express.Router();
var apriori = require("node-apriori/dist/apriori");
const {
    database
} = require('../config/helpers');
const crypto = require('crypto');
var apriori = require("node-apriori/dist/apriori");

var options = {
    loginterval: 3,
    antecedent : ["lhs1"],
    exclusions : ["lhs2"] ,
    thresholds : {
        freq : 0
    }
};


// router.get('/', (req, res) => {
//     database.table('orders_details as od')
//         .join([{
//             table: 'orders as o',
//             on: 'o.id = od.order_id'
//         },
//             {
//                 table: 'products as p',
//                 on: 'p.id = od.product_id'
//             }
//         ])
//         .withFields(['od.product_id', 'p.title as name', 'od.quantity'])
//         .getAll()
//         .then(orders => {
//             if (orders.length > 0) {
//                 res.json(orders);
//             } else {
//                 res.json({
//                     message: "No orders found"
//                 });
//             }
//
//         }).catch(err => res.json(err));
// });



router.get('/', (req, res) => {
    database.table('orders_details as od')
        .join([{
            table: 'orders as o',
            on: 'o.id = od.order_id'
        },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            }
        ])
        .withFields(['od.product_id', 'p.title as name'])
        .getAll()
        .then(rules => {
            if (rules.length > 0) {
                res.json(rules);
            } else {
                res.json({
                    message: "🍭 No orders found"
                });
            }

        }).catch(err => res.json(err));
});

router.get('/rule', (req, res) => {

    var transactions = [
       req.url('/rules')
    ];


// Execute Apriori with a minimum support of 40%.
    var apriori = new apriori.Apriori(.4);
    console.log(`Executing Apriori...`);

// Returns itemsets 'as soon as possible' through events.
    apriori.on('data', function (itemset) {
        // Do something with the frequent itemset.
        var support = itemset.support;
        var items = itemset.items;
        console.log(`Itemset { ${items.join(',')} } is frequent and have a support of ${support}`);
    });

// Execute Apriori on a given set of transactions.
    apriori.exec(transactions)
        .then(function (result) {
            // Returns both the collection of frequent itemsets and execution time in millisecond.
            var frequentItemsets = result.itemsets;
            var executionTime = result.executionTime;
            console.log(`Finished executing Apriori. ${frequentItemsets.length} frequent itemsets were found in ${executionTime}ms.`);
        });

});


module.exports = router;

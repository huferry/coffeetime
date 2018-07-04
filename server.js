const express = require('express')
const app = express()

app.use('/', express.static('static'))

var orders = [];
var items = ["Coffee", "Hot Water", "Cold Water", "Cappuccino", "Cf.Latte", "Cf.Verkeerd"];

app.get('/api/order', (req, res) => {
    res.json(orders);
})

app.get('/api/items', (req, res) => {
    res.json(items);
})

app.post('/api/order/:name/:item', (req,res) => {
    addOrder(req.params);    
    res.json(countTotals());
})

app.delete('/api/order/:name', (req, res) => {
    removeOrder(req.params['name']);
    res.json(countTotals());
})

app.delete('/api/order', (req, res) => {
    orders = [];
    res.json(countTotals());
})

app.get('/api/totals', (req, res) => {
    res.json(countTotals());
})

function countTotals() {
    var totals = [];
    for(var i=0; i<items.length; i++) {
        totals[totals.length] = {
            "item": items[i],
            "count": countItems(items[i])
        }
    }
    return totals;
}

function addOrder(order) {
    var i;
    for(i=0; i<orders.length; i++) {
        if (orders[i].name == order.name) {
            break;
        }
    }
    orders[i] = order;
}

function removeOrder(name) {
    orders = orders.filter(o => o.name != name);
}

function getDistictItems() {
    var items = [];
    for(var i=0; i<orders.length; i++) {
        if (items.indexOf(orders[i].item) == -1) {
            items[items.length] = orders[i].item;
        }
    }
    return items;
}

function countItems(item) {
    var count = 0;
    for(var i=0; i<orders.length; i++) {
        if (orders[i].item == item) {
            count ++;
        }
    }
    return count;
}

app.listen(8080, () => console.log('Example app listening on port 8080!'))
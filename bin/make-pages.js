const fs = require('fs');
const bills = require('../data/bills.json');

bills.forEach(bill => {
    const content = `---
title: "${bill.title}"
billId: "${bill.id}"
---
`;
    fs.writeFileSync(`content/bills/${bill.id}.md`, content);
});
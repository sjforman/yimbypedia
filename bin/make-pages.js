const fs = require('fs');
const path = require('path');

// Read the bills data from the JSON file
const billsData = JSON.parse(fs.readFileSync('data/bills.json', 'utf8'));

// Create the content/bills directory if it doesn't exist
const billsDir = path.join('content', 'bills');
if (!fs.existsSync(billsDir)) {
  fs.mkdirSync(billsDir);
}

// Generate Markdown files for each bill
billsData.forEach(bill => {
  const billFileName = `${bill.id}.md`;
  const billFilePath = path.join(billsDir, billFileName);
  const billContent = `---
title: "${bill.title}"
---

${bill.content}
`;
  fs.writeFileSync(billFilePath, billContent);
});
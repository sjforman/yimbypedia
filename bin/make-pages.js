const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

function generateMarkdownFiles() {
  // Read the bills data from the JSON file
  const billsData = JSON.parse(fs.readFileSync('data/bills.json', 'utf8'));

  // Create the content/bills directory if it doesn't exist
  const billsDir = path.join('content', 'bills');
  if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir);
  }

  // Generate Markdown files for each bill
  billsData.forEach(bill => {
    const billFileName = `${bill.id.toLowerCase()}.md`;
    const billFilePath = path.join(billsDir, billFileName);
    const billContent = `---
${JSON.stringify(bill, null, 2)}
---

${bill.summary}
`;

    fs.writeFileSync(billFilePath, billContent);
  });

  console.log('Markdown files generated successfully.');
}

// Watch for changes in the bills.json file
chokidar.watch('data/bills.json').on('change', (path) => {
  console.log(`${path} changed. Regenerating Markdown files...`);
  generateMarkdownFiles();
});

// Generate Markdown files initially
generateMarkdownFiles();
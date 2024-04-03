const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const yaml = require('js-yaml'); // Ensure js-yaml is installed

function generateMarkdownFiles() {
  const billsData = JSON.parse(fs.readFileSync('data/bills.json', 'utf8'));
  const billsDir = path.join('content', 'bills');

  // Delete the content/bills directory and its contents before regeneration
  fs.rmSync(billsDir, { recursive: true, force: true });
  console.log('Deleted existing Markdown files.');

  // Recreate the content/bills directory
  if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir, { recursive: true });
  }

  billsData.forEach(bill => {
    const statusSort = bill.statuses.includes("Pending") ? 0 : (bill.statuses.includes("Enacted") ? 1 : 2);
    bill.statusSort = statusSort;

    const billFileName = `${bill.id.toLowerCase()}.md`;
    const billFilePath = path.join(billsDir, billFileName);
    const frontMatter = yaml.dump(bill);

    const billContent = `---
${frontMatter}---
`;

    fs.writeFileSync(billFilePath, billContent);
  });

  console.log('Markdown files generated successfully.');
}

chokidar.watch('data/bills.json').on('change', () => {
  console.log('bills.json changed. Regenerating Markdown files...');
  generateMarkdownFiles();
});

generateMarkdownFiles();
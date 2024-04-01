const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const yaml = require('js-yaml'); // Make sure js-yaml is installed

function generateMarkdownFiles() {
  // Read the bills data from the JSON file
  const billsData = JSON.parse(fs.readFileSync('data/bills.json', 'utf8'));

  // Create the content/bills directory if it doesn't exist
  const billsDir = path.join('content', 'bills');
  if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir, { recursive: true });
  }

  // Generate Markdown files for each bill
  billsData.forEach(bill => {
    const billFileName = `${bill.id.toLowerCase()}.md`;
    const billFilePath = path.join(billsDir, billFileName);
    // Dumping the entire bill object into YAML for the front matter
    const frontMatter = yaml.dump(bill);

    const billContent = `---
${frontMatter}---
`;

    fs.writeFileSync(billFilePath, billContent);
  });

  console.log('Markdown files generated successfully.');
}

// Watch for changes in the bills.json file
chokidar.watch('data/bills.json').on('change', () => {
  console.log('bills.json changed. Regenerating Markdown files...');
  generateMarkdownFiles();
});

// Generate Markdown files initially
generateMarkdownFiles();
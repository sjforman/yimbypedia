const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const yaml = require('js-yaml'); // Ensure js-yaml is installed

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
    // Determine the statusSort value based on the bill's status
    const statusSort = bill.statuses.includes("Pending") ? 0 : (bill.statuses.includes("Enacted") ? 1 : 2); // Added fallback value 2 for any other statuses

    // Add the statusSort field to the bill object
    bill.statusSort = statusSort;

    const billFileName = `${bill.id.toLowerCase()}.md`;
    const billFilePath = path.join(billsDir, billFileName);
    
    // Dumping the entire bill object, now including statusSort, into YAML for the front matter
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

const fs = require('fs');
const path = require('path');

function deleteMarkdownFiles(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        deleteMarkdownFiles(fullPath);
      } else if (stat.isFile() && item.endsWith('.md')) {
        // Delete .md files
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${fullPath}`);
      }
    }
  } catch (error) {
    // If directory doesn't exist or other error, just continue
    if (error.code !== 'ENOENT') {
      console.warn(`Warning: ${error.message}`);
    }
  }
}

// Start cleanup from pages directory
const pagesDir = path.join(__dirname, '..', 'pages');
console.log('Cleaning up .md files from pages directory...');
deleteMarkdownFiles(pagesDir);
console.log('Cleanup complete.');
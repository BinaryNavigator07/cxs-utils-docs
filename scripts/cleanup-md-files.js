const fs = require('fs');
const path = require('path');

function deleteMarkdownFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        deleteMarkdownFiles(filePath);
      } else if (file.endsWith('.md')) {
        // Delete .md files
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    });
  } catch (error) {
    // If directory doesn't exist, that's fine - nothing to clean up
    if (error.code !== 'ENOENT') {
      console.error(`Error processing directory ${dir}:`, error.message);
    }
  }
}

// Clean up .md files in the pages directory
if (fs.existsSync('pages')) {
  console.log('Cleaning up .md files...');
  deleteMarkdownFiles('pages');
  console.log('Cleanup complete.');
} else {
  console.log('Pages directory not found, skipping cleanup.');
}
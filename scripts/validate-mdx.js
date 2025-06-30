const fs = require('fs');
const path = require('path');

function validateMDXFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    
    // Check for frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      errors.push('Missing frontmatter');
    } else {
      const frontmatterText = frontmatterMatch[1];
      if (!frontmatterText.includes('title:')) {
        errors.push('Missing title in frontmatter');
      }
    }
    
    // Check for unclosed components
    const componentMatches = content.matchAll(/<(\w+)(?:\s[^>]*)?>[\s\S]*?<\/\1>/g);
    const openTags = content.matchAll(/<(\w+)(?:\s[^>]*)?>/g);
    const closeTags = content.matchAll(/<\/(\w+)>/g);
    
    const openTagNames = Array.from(openTags).map(match => match[1]).filter(tag => !['br', 'hr', 'img', 'input'].includes(tag.toLowerCase()));
    const closeTagNames = Array.from(closeTags).map(match => match[1]);
    
    // Simple check for balanced tags
    openTagNames.forEach(tag => {
      const openCount = openTagNames.filter(t => t === tag).length;
      const closeCount = closeTagNames.filter(t => t === tag).length;
      if (openCount !== closeCount) {
        errors.push(`Unbalanced tags for component: ${tag}`);
      }
    });
    
    return {
      file: filePath,
      errors,
      valid: errors.length === 0
    };
  } catch (error) {
    return {
      file: filePath,
      errors: [`Failed to read file: ${error.message}`],
      valid: false
    };
  }
}

function validateAllMDX() {
  const docsDir = path.join(process.cwd(), 'pages');
  const results = [];
  
  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.mdx')) {
        results.push(validateMDXFile(filePath));
      }
    }
  }
  
  walkDir(docsDir);
  
  // Report results
  const validFiles = results.filter(r => r.valid);
  const invalidFiles = results.filter(r => !r.valid);
  
  console.log(`\n📊 MDX Validation Results:`);
  console.log(`✅ Valid files: ${validFiles.length}`);
  console.log(`❌ Invalid files: ${invalidFiles.length}`);
  
  if (invalidFiles.length > 0) {
    console.log('\n❌ Validation Errors:');
    invalidFiles.forEach(result => {
      console.log(`\n${result.file}:`);
      result.errors.forEach(error => {
        console.log(`  - ${error}`);
      });
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All MDX files are valid!');
  }
}

if (require.main === module) {
  validateAllMDX();
}

module.exports = { validateMDXFile, validateAllMDX };
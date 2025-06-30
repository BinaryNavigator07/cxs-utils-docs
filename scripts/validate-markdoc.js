const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const { validateFrontmatter } = require('../markdoc/schema');

function validateMarkdocFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const ast = Markdoc.parse(content);
  const errors = Markdoc.validate(ast);
  
  // Validate frontmatter
  const frontmatter = ast.attributes?.frontmatter || {};
  const frontmatterErrors = validateFrontmatter(frontmatter);
  
  return {
    file: filePath,
    errors: [...errors, ...frontmatterErrors.map(msg => ({ message: msg }))],
    valid: errors.length === 0 && frontmatterErrors.length === 0
  };
}

function validateAllDocs() {
  const docsDir = path.join(process.cwd(), 'pages/docs');
  const results = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.mdoc')) {
        results.push(validateMarkdocFile(filePath));
      }
    }
  }
  
  walkDir(docsDir);
  
  // Report results
  const validFiles = results.filter(r => r.valid);
  const invalidFiles = results.filter(r => !r.valid);
  
  console.log(`\n📊 Validation Results:`);
  console.log(`✅ Valid files: ${validFiles.length}`);
  console.log(`❌ Invalid files: ${invalidFiles.length}`);
  
  if (invalidFiles.length > 0) {
    console.log('\n❌ Validation Errors:');
    invalidFiles.forEach(result => {
      console.log(`\n${result.file}:`);
      result.errors.forEach(error => {
        console.log(`  - ${error.message}`);
      });
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All documentation files are valid!');
  }
}

if (require.main === module) {
  validateAllDocs();
}

module.exports = { validateMarkdocFile, validateAllDocs };
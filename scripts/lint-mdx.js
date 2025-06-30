const fs = require('fs');
const path = require('path');

function lintMDXFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const warnings = [];
  
  // Check for consistent heading structure
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  let lastLevel = 0;
  
  headings.forEach((heading, index) => {
    const level = heading.match(/^#+/)[0].length;
    if (level > lastLevel + 1) {
      warnings.push(`Heading level skipped at line with "${heading.trim()}"`);
    }
    lastLevel = level;
  });
  
  // Check for proper component capitalization
  const componentMatches = content.matchAll(/<([a-z][a-zA-Z]*)/g);
  Array.from(componentMatches).forEach(match => {
    const componentName = match[1];
    if (componentName[0] === componentName[0].toLowerCase() && 
        !['div', 'span', 'p', 'a', 'img', 'br', 'hr', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody'].includes(componentName)) {
      warnings.push(`Component "${componentName}" should be capitalized`);
    }
  });
  
  // Check for missing alt text on images
  const imageMatches = content.matchAll(/!\[([^\]]*)\]\([^)]+\)/g);
  Array.from(imageMatches).forEach(match => {
    if (!match[1] || match[1].trim() === '') {
      warnings.push('Image missing alt text');
    }
  });
  
  return {
    file: filePath,
    warnings,
    clean: warnings.length === 0
  };
}

function lintAllMDX() {
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
        results.push(lintMDXFile(filePath));
      }
    }
  }
  
  walkDir(docsDir);
  
  // Report results
  const cleanFiles = results.filter(r => r.clean);
  const filesWithWarnings = results.filter(r => !r.clean);
  
  console.log(`\n📊 MDX Lint Results:`);
  console.log(`✅ Clean files: ${cleanFiles.length}`);
  console.log(`⚠️ Files with warnings: ${filesWithWarnings.length}`);
  
  if (filesWithWarnings.length > 0) {
    console.log('\n⚠️ Lint Warnings:');
    filesWithWarnings.forEach(result => {
      console.log(`\n${result.file}:`);
      result.warnings.forEach(warning => {
        console.log(`  - ${warning}`);
      });
    });
  } else {
    console.log('\n🎉 All MDX files are clean!');
  }
}

if (require.main === module) {
  lintAllMDX();
}

module.exports = { lintMDXFile, lintAllMDX };
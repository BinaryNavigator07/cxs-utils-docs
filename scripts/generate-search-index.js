const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

function extractSearchableContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const ast = Markdoc.parse(content);
    const frontmatter = ast.attributes?.frontmatter || {};
    
    // Skip if marked to skip in search
    if (frontmatter.search_skip) return null;
    
    // Extract text content from AST
    function extractText(node) {
      if (typeof node === 'string') return node;
      if (!node || !node.children) return '';
      
      return node.children
        .map(child => extractText(child))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
    
    const textContent = extractText(ast);
    
    // Extract headings for better search context
    const headings = [];
    function extractHeadings(node) {
      if (node && node.type === 'heading') {
        const headingText = extractText(node);
        if (headingText) {
          headings.push(headingText);
        }
      }
      if (node && node.children) {
        node.children.forEach(extractHeadings);
      }
    }
    extractHeadings(ast);
    
    return {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      content: textContent,
      headings,
      tags: frontmatter.tags || []
    };
  } catch (error) {
    console.warn(`Warning: Could not process ${filePath} for search indexing`);
    return null;
  }
}

function generateSearchIndex() {
  const docsDir = path.join(process.cwd(), 'pages/docs');
  const searchIndex = [];
  
  function processDirectory(dir, basePath = '/docs') {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath, `${basePath}/${file}`);
      } else if (file.endsWith('.mdoc')) {
        const content = extractSearchableContent(filePath);
        if (content) {
          const fileName = file.replace('.mdoc', '');
          let urlPath;
          
          if (fileName === 'index') {
            urlPath = basePath;
          } else {
            urlPath = `${basePath}/${fileName}`;
          }
          
          searchIndex.push({
            id: urlPath,
            path: urlPath,
            title: content.title,
            descriptionSnippet: content.description || content.content.substring(0, 200) + '...',
            content: content.content,
            headings: content.headings,
            tags: content.tags
          });
        }
      }
    }
  }
  
  processDirectory(docsDir);
  
  // Write search index
  const outputPath = path.join(process.cwd(), 'public/search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✅ Generated search index: ${searchIndex.length} documents`);
  return searchIndex;
}

if (require.main === module) {
  generateSearchIndex();
}

module.exports = { generateSearchIndex };
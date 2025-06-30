const fs = require('fs');
const path = require('path');

function extractSearchableContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let frontmatter = {};
    let mainContent = content;
    
    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      mainContent = content.slice(frontmatterMatch[0].length);
      
      // Simple YAML parsing
      frontmatterText.split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*(.*)$/);
        if (match) {
          const [, key, value] = match;
          if (value.startsWith('"') && value.endsWith('"')) {
            frontmatter[key] = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            frontmatter[key] = value.slice(1, -1);
          } else if (value === 'true' || value === 'false') {
            frontmatter[key] = value === 'true';
          } else {
            frontmatter[key] = value;
          }
        }
      });
    }
    
    // Skip if marked to skip in search
    if (frontmatter.search_skip) return null;
    
    // Extract text content (remove MDX components and markdown syntax)
    let textContent = mainContent
      .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
      .replace(/[#*_~]/g, '') // Remove markdown formatting
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Extract headings
    const headings = [];
    const headingMatches = mainContent.matchAll(/^(#{1,6})\s+(.+)$/gm);
    for (const match of headingMatches) {
      headings.push(match[2].trim());
    }
    
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
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath, `${basePath}/${file}`);
      } else if (file.endsWith('.mdx')) {
        const content = extractSearchableContent(filePath);
        if (content) {
          const fileName = file.replace('.mdx', '');
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
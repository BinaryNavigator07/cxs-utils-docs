const fs = require('fs');
const path = require('path');

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      const frontmatter = {};
      
      // Simple YAML parsing for basic frontmatter
      frontmatterText.split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*(.*)$/);
        if (match) {
          const [, key, value] = match;
          // Handle quoted strings
          if (value.startsWith('"') && value.endsWith('"')) {
            frontmatter[key] = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            frontmatter[key] = value.slice(1, -1);
          } else if (!isNaN(value)) {
            frontmatter[key] = parseInt(value);
          } else if (value === 'true' || value === 'false') {
            frontmatter[key] = value === 'true';
          } else {
            frontmatter[key] = value;
          }
        }
      });
      
      return frontmatter;
    }
    
    return {};
  } catch (error) {
    console.warn(`Warning: Could not parse frontmatter from ${filePath}`);
    return {};
  }
}

function generateNavigation() {
  const docsDir = path.join(process.cwd(), 'pages/docs');
  
  function processDirectory(dir, basePath = '/docs') {
    const items = [];
    
    if (!fs.existsSync(dir)) {
      return items;
    }
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        const subItems = processDirectory(filePath, `${basePath}/${file}`);
        if (subItems.length > 0) {
          // Check for index file in subdirectory
          const indexPath = path.join(filePath, 'index.mdx');
          let title = file.charAt(0).toUpperCase() + file.slice(1);
          let order = null;
          
          if (fs.existsSync(indexPath)) {
            const frontmatter = extractFrontmatter(indexPath);
            title = frontmatter.title || title;
            order = frontmatter.nav_order || null;
          }
          
          items.push({
            title,
            path: `${basePath}/${file}`,
            order,
            children: subItems
          });
        }
      } else if (file.endsWith('.mdx')) {
        const frontmatter = extractFrontmatter(filePath);
        const fileName = file.replace('.mdx', '');
        
        // Skip if marked to skip in search/nav
        if (frontmatter.search_skip) continue;
        
        let itemPath;
        if (fileName === 'index') {
          itemPath = basePath;
        } else {
          itemPath = `${basePath}/${fileName}`;
        }
        
        items.push({
          title: frontmatter.title || fileName.charAt(0).toUpperCase() + fileName.slice(1),
          path: itemPath,
          order: frontmatter.nav_order || null,
          children: []
        });
      }
    }
    
    // Sort items by order (nulls last), then by title
    return items.sort((a, b) => {
      if (a.order === null && b.order === null) {
        return a.title.localeCompare(b.title);
      }
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    });
  }
  
  const navigation = processDirectory(docsDir);
  
  // Write navigation data
  const outputPath = path.join(process.cwd(), 'components/sidenav-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(navigation, null, 2));
  
  console.log(`✅ Generated navigation data: ${navigation.length} top-level items`);
  return navigation;
}

if (require.main === module) {
  generateNavigation();
}

module.exports = { generateNavigation };
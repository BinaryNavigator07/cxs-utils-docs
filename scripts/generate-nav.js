const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const ast = Markdoc.parse(content);
    return ast.attributes?.frontmatter || {};
  } catch (error) {
    console.warn(`Warning: Could not parse frontmatter from ${filePath}`);
    return {};
  }
}

function generateNavigation() {
  const docsDir = path.join(process.cwd(), 'pages/docs');
  const navItems = [];
  
  function processDirectory(dir, basePath = '/docs') {
    const items = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        const subItems = processDirectory(filePath, `${basePath}/${file}`);
        if (subItems.length > 0) {
          // Check for index file in subdirectory
          const indexPath = path.join(filePath, 'index.mdoc');
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
      } else if (file.endsWith('.mdoc')) {
        const frontmatter = extractFrontmatter(filePath);
        const fileName = file.replace('.mdoc', '');
        
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
const fs = require('fs');
const path = require('path');

function convertMarkdocToMDX(content) {
  // Convert Markdoc tags to MDX components
  let converted = content;
  
  // Convert callout tags
  converted = converted.replace(/{% callout type="([^"]*)"(.*?) %}/g, '<Callout type="$1"$2>');
  converted = converted.replace(/{% \/callout %}/g, '</Callout>');
  
  // Convert specific callout types
  converted = converted.replace(/{% note(.*?) %}/g, '<Note$1>');
  converted = converted.replace(/{% \/note %}/g, '</Note>');
  
  converted = converted.replace(/{% warning(.*?) %}/g, '<Warning$1>');
  converted = converted.replace(/{% \/warning %}/g, '</Warning>');
  
  converted = converted.replace(/{% tip(.*?) %}/g, '<Tip$1>');
  converted = converted.replace(/{% \/tip %}/g, '</Tip>');
  
  converted = converted.replace(/{% important(.*?) %}/g, '<Important$1>');
  converted = converted.replace(/{% \/important %}/g, '</Important>');
  
  // Convert tabs
  converted = converted.replace(/{% tabs %}/g, '<Tabs>');
  converted = converted.replace(/{% \/tabs %}/g, '</Tabs>');
  
  converted = converted.replace(/{% tab label="([^"]*)" %}/g, '<Tab label="$1">');
  converted = converted.replace(/{% \/tab %}/g, '</Tab>');
  
  // Convert codepane
  converted = converted.replace(/{% codepane %}/g, '<CodePane>');
  converted = converted.replace(/{% \/codepane %}/g, '</CodePane>');
  
  return converted;
}

function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const converted = convertMarkdocToMDX(content);
  
  // Change extension from .mdoc to .mdx
  const newPath = filePath.replace('.mdoc', '.mdx');
  fs.writeFileSync(newPath, converted);
  
  // Remove old .mdoc file
  fs.unlinkSync(filePath);
  
  console.log(`Converted: ${filePath} -> ${newPath}`);
}

function convertDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      convertDirectory(fullPath);
    } else if (item.endsWith('.mdoc')) {
      convertFile(fullPath);
    }
  }
}

// Convert all .mdoc files in pages directory
const pagesDir = path.join(__dirname, '..', 'pages');
console.log('Converting .mdoc files to .mdx...');
convertDirectory(pagesDir);
console.log('Conversion complete!');
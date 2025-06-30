# ContextSuite Documentation

This repository contains the comprehensive documentation for ContextSuite, built with Next.js and MDX.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
├── pages/                    # Next.js pages and documentation
│   ├── docs/                # Main documentation content (.mdx files)
│   └── _app.tsx             # Next.js app configuration
├── components/              # React components
│   ├── Callout.tsx         # Custom callout components
│   ├── CodeBlock.tsx       # Code block with syntax highlighting
│   ├── Tabs.tsx            # Tabbed content component
│   ├── MDXComponents.tsx   # MDX component mapping
│   └── ...                 # Other UI components
├── scripts/                # Build and utility scripts
│   ├── generate-nav.js     # Navigation generation
│   ├── generate-search-index.js # Search index generation
│   ├── validate-mdx.js     # Documentation validation
│   └── lint-mdx.js         # Documentation linting
└── public/                 # Static assets
```

## 📝 Documentation Format

This project uses **MDX** (.mdx files) for enhanced documentation capabilities:

- **React Components**: Use React components directly in markdown
- **Enhanced Validation**: Built-in validation and link checking
- **Better Performance**: Optimized build-time processing
- **Rich Components**: Interactive elements and enhanced formatting
- **TypeScript Support**: Full TypeScript integration

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run validate-docs` - Validate all documentation files
- `npm run lint-docs` - Lint documentation for consistency

## 📖 Writing Documentation

### File Format
All documentation files use the `.mdx` extension and include frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description"
nav_order: 1  # Optional: custom ordering
---
```

### Custom Components

#### Callouts
```mdx
<Note>
Informational content
</Note>

<Warning>
Warning content
</Warning>

<Tip>
Helpful tips
</Tip>

<Important>
Critical information
</Important>
```

#### Tabs
```mdx
<Tabs>
  <Tab label="JavaScript">
    ```javascript
    console.log("Hello");
    ```
  </Tab>
  <Tab label="Python">
    ```python
    print("Hello")
    ```
  </Tab>
</Tabs>
```

#### Code Pane
```mdx
<CodePane>
```json
{
  "example": "Appears in right panel"
}
```
</CodePane>
```

## 🔍 Features

- **Search**: Full-text search across all documentation
- **Navigation**: Auto-generated navigation from file structure
- **Responsive**: Mobile-friendly design
- **Syntax Highlighting**: Code blocks with copy functionality
- **Link Validation**: Automatic checking of internal links
- **SEO Optimized**: Proper meta tags and structured data

## 🏗️ Architecture

### MDX Integration
- React components directly in markdown
- TypeScript support for component props
- Build-time optimization for performance
- Validation rules for content quality

### Component System
- Reusable React components for consistent UI
- Context providers for global state management
- Responsive design with CSS-in-JS styling
- Accessibility-first approach

### Build Process
1. **Pre-build**: Generate navigation and search index
2. **MDX Processing**: Transform .mdx files to React components
3. **Next.js Build**: Static site generation with optimizations
4. **Validation**: Check for broken links and content issues

## 📋 Content Guidelines

### File Organization
- Use descriptive filenames in kebab-case
- Organize related content in subdirectories
- Include `index.mdx` files for section overviews

### Writing Style
- Use clear, concise language
- Include code examples where helpful
- Add proper headings for table of contents
- Use custom components for enhanced formatting

### Link Management
- Use relative paths for internal links
- Reference `.mdx` files in links (URLs remain clean)
- Test all links before publishing

## 🔧 Development

### Adding New Features
1. Create components in `/components`
2. Add to `MDXComponents.tsx` for use in MDX
3. Update TypeScript types as needed
4. Test with validation scripts

### Debugging
- Use `npm run validate-docs` to check for issues
- Use `npm run lint-docs` for style consistency
- Check browser console for runtime errors
- Verify navigation and search functionality

## 📚 Migration from Markdoc

This project was migrated from Markdoc to MDX. See `docs/MDX_MIGRATION.md` for detailed information about the migration process and benefits.

## 🤝 Contributing

1. Follow the established file structure
2. Use proper frontmatter in all documents
3. Run validation before committing
4. Test changes in development environment
5. Update navigation if adding new sections

## 📄 License

This documentation is part of the ContextSuite project. See the main project for licensing information.
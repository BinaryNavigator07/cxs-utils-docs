# ContextSuite Documentation

This repository contains the comprehensive documentation for ContextSuite, built with Next.js and Markdoc.

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
│   ├── docs/                # Main documentation content (.mdoc files)
│   └── _app.tsx             # Next.js app configuration
├── components/              # React components
│   ├── Callout.tsx         # Custom callout components
│   ├── CodeBlock.tsx       # Code block with syntax highlighting
│   ├── Tabs.tsx            # Tabbed content component
│   └── ...                 # Other UI components
├── markdoc/                # Markdoc configuration
│   ├── nodes/              # Custom Markdoc nodes
│   ├── tags/               # Custom Markdoc tags
│   └── markdoc.config.js   # Main Markdoc configuration
├── scripts/                # Build and utility scripts
│   ├── generate-nav.js     # Navigation generation
│   ├── generate-search-index.js # Search index generation
│   └── validate-markdoc.js # Documentation validation
└── public/                 # Static assets
```

## 📝 Documentation Format

This project uses **Markdoc** (.mdoc files) for enhanced documentation capabilities:

- **Custom Tags**: `{% callout %}`, `{% tabs %}`, `{% codepane %}`, etc.
- **Enhanced Validation**: Built-in schema validation and link checking
- **Better Performance**: Optimized build-time processing
- **Rich Components**: Interactive elements and enhanced formatting

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run validate-docs` - Validate all documentation files
- `npm run lint-docs` - Lint documentation for consistency

## 📖 Writing Documentation

### File Format
All documentation files use the `.mdoc` extension and include frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description"
nav_order: 1  # Optional: custom ordering
---
```

### Custom Tags

#### Callouts
```markdown
{% note %}
Informational content
{% /note %}

{% warning %}
Warning content
{% /warning %}

{% tip %}
Helpful tips
{% /tip %}

{% important %}
Critical information
{% /important %}
```

#### Tabs
```markdown
{% tabs %}
  {% tab label="JavaScript" %}
  ```javascript
  console.log("Hello");
  ```
  {% /tab %}
  {% tab label="Python" %}
  ```python
  print("Hello")
  ```
  {% /tab %}
{% /tabs %}
```

#### Code Pane
```markdown
{% codepane %}
```json
{
  "example": "Appears in right panel"
}
```
{% /codepane %}
```

## 🔍 Features

- **Search**: Full-text search across all documentation
- **Navigation**: Auto-generated navigation from file structure
- **Responsive**: Mobile-friendly design
- **Syntax Highlighting**: Code blocks with copy functionality
- **Link Validation**: Automatic checking of internal links
- **SEO Optimized**: Proper meta tags and structured data

## 🏗️ Architecture

### Markdoc Integration
- Custom nodes for enhanced Markdown processing
- Custom tags for specialized content blocks
- Validation rules for content quality
- Build-time optimization for performance

### Component System
- Reusable React components for consistent UI
- Context providers for global state management
- Responsive design with CSS-in-JS styling
- Accessibility-first approach

### Build Process
1. **Pre-build**: Generate navigation and search index
2. **Markdoc Processing**: Transform .mdoc files to React components
3. **Next.js Build**: Static site generation with optimizations
4. **Validation**: Check for broken links and content issues

## 📋 Content Guidelines

### File Organization
- Use descriptive filenames in kebab-case
- Organize related content in subdirectories
- Include `index.mdoc` files for section overviews

### Writing Style
- Use clear, concise language
- Include code examples where helpful
- Add proper headings for table of contents
- Use custom tags for enhanced formatting

### Link Management
- Use relative paths for internal links
- Reference `.mdoc` files in links (URLs remain clean)
- Test all links before publishing

## 🔧 Development

### Adding New Features
1. Create components in `/components`
2. Add Markdoc tags in `/markdoc/tags`
3. Update configuration in `markdoc.config.js`
4. Test with validation scripts

### Debugging
- Use `npm run validate-docs` to check for issues
- Check browser console for runtime errors
- Verify navigation and search functionality

## 📚 Migration from Markdown

See `docs/MIGRATION_GUIDE.md` for detailed information about migrating from standard Markdown to Markdoc format.

## 🤝 Contributing

1. Follow the established file structure
2. Use proper frontmatter in all documents
3. Run validation before committing
4. Test changes in development environment
5. Update navigation if adding new sections

## 📄 License

This documentation is part of the ContextSuite project. See the main project for licensing information.
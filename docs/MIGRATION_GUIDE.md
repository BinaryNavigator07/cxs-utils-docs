# Markdoc Migration Guide

This guide covers the migration from standard Markdown (.md) to Markdoc (.mdoc) format and the new features available.

## Overview

All documentation files have been converted from `.md` to `.mdoc` format to leverage Markdoc's enhanced features including:

- Custom tags and components
- Enhanced validation
- Better content organization
- Improved build-time processing

## File Structure Changes

### Before (Markdown)
```
pages/docs/
├── index.md
├── entities/
│   ├── index.md
│   └── identification.md
└── semantic-events/
    ├── index.md
    └── best-practices.md
```

### After (Markdoc)
```
pages/docs/
├── index.mdoc
├── entities/
│   ├── index.mdoc
│   └── identification.mdoc
└── semantic-events/
    ├── index.mdoc
    └── best-practices.mdoc
```

## Syntax Changes

### Callouts

**Before (Markdown):**
```markdown
> **Note:** This is important information.
```

**After (Markdoc):**
```markdoc
{% callout type="note" %}
This is important information.
{% /callout %}
```

### Available Callout Types

- `{% note %}` - For informational content
- `{% warning %}` - For cautionary information
- `{% tip %}` - For helpful suggestions
- `{% important %}` - For critical information
- `{% callout %}` - Generic callout with custom styling

### Tabbed Content

**New Feature in Markdoc:**
```markdoc
{% tabs %}
  {% tab label="JavaScript" %}
  ```javascript
  console.log('Hello World');
  ```
  {% /tab %}
  {% tab label="Python" %}
  ```python
  print('Hello World')
  ```
  {% /tab %}
{% /tabs %}
```

### Code Pane Layout

**New Feature for Side-by-Side Documentation:**
```markdoc
{% codepane %}
```json
{
  "example": "configuration"
}
```
{% /codepane %}
```

## Frontmatter

Frontmatter structure remains the same:

```yaml
---
title: Page Title
description: Page description
nav_order: 1
search_skip: false
---
```

## Internal Links

**Before:**
```markdown
[Link text](./other-page.md)
```

**After:**
```markdoc
[Link text](./other-page)
```

Note: Remove the `.md` extension from internal links.

## Build Process

### New Scripts

- `npm run validate-docs` - Validates all Markdoc files
- `npm run lint-docs` - Lints documentation for consistency
- `npm run dev` - Development server with Markdoc processing
- `npm run build` - Production build with validation

### Validation

The new validation system checks for:

- Valid frontmatter
- Proper tag syntax
- Unclosed tags
- Missing required fields

## Custom Components

### Enhanced Images

Images now use Next.js optimization:

```markdoc
![Alt text](image.jpg?w=600&h=400 "Caption text")
```

### Enhanced Code Blocks

Code blocks now include:
- Syntax highlighting
- Copy buttons
- Language detection

## Migration Checklist

When creating new documentation:

- [ ] Use `.mdoc` extension
- [ ] Include proper frontmatter with `title`
- [ ] Use new callout syntax
- [ ] Remove `.md` from internal links
- [ ] Validate with `npm run validate-docs`
- [ ] Test locally with `npm run dev`

## Troubleshooting

### Common Issues

1. **Unclosed Tags**: Ensure all `{% tag %}` have matching `{% /tag %}`
2. **Missing Frontmatter**: All files need at least a `title` field
3. **Invalid Links**: Remove `.md` extensions from internal links
4. **Build Errors**: Run `npm run validate-docs` to identify issues

### Getting Help

- Check the validation output for specific error messages
- Review existing `.mdoc` files for examples
- Ensure all custom tags are properly closed

## Benefits of Migration

1. **Enhanced Authoring**: Rich custom tags and components
2. **Better Validation**: Build-time checking for errors
3. **Improved Performance**: Optimized build process
4. **Consistent Styling**: Standardized callouts and formatting
5. **Future-Proof**: Extensible system for new features

This migration provides a solid foundation for enhanced documentation authoring while maintaining compatibility with existing content structure.
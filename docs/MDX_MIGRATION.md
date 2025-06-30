# MDX Migration Guide

This project has been successfully migrated from Markdoc to MDX for better compatibility and stability with Next.js.

## What Changed

### 1. File Extensions
- All `.mdoc` files have been converted to `.mdx`
- Updated build scripts to process `.mdx` files

### 2. Dependencies
- Removed `@markdoc/markdoc` and `@markdoc/next.js`
- Added `@next/mdx`, `@mdx-js/react`, and `@mdx-js/loader`
- Added `remark-gfm` for GitHub Flavored Markdown support
- Added `rehype-highlight` for syntax highlighting

### 3. Configuration
- Updated `next.config.js` to use `@next/mdx`
- Created `MDXComponents.tsx` for custom component mapping
- Updated `_app.tsx` to use `MDXProvider`

### 4. Component Syntax
Markdoc tags have been converted to MDX components:

**Before (Markdoc):**
```markdoc
{% callout type="note" %}
This is a note
{% /callout %}
```

**After (MDX):**
```mdx
<Note>
This is a note
</Note>
```

### 5. Available Components

- `<Note>` - Blue informational callouts
- `<Warning>` - Orange warning callouts  
- `<Tip>` - Green tip callouts
- `<Important>` - Red important callouts
- `<Callout type="...">` - Generic callout with custom type
- `<Tabs>` and `<Tab>` - Tabbed content
- `<CodePane>` - Side-by-side code layout

## Benefits of MDX

1. **Native Next.js Support**: MDX is officially supported by Next.js
2. **Better TypeScript Integration**: Full TypeScript support for components
3. **Wider Ecosystem**: More plugins and community support
4. **Direct React Components**: Use React components directly in markdown
5. **Better Error Handling**: More descriptive error messages
6. **Performance**: Optimized build process

## Migration Process

The migration was automated using a conversion script that:

1. Converted Markdoc tag syntax to MDX component syntax
2. Updated file extensions from `.mdoc` to `.mdx`
3. Preserved all frontmatter and content
4. Updated build scripts and navigation generation

## Writing New Documentation

When creating new documentation files:

1. Use `.mdx` extension
2. Include frontmatter with at least a `title`
3. Use MDX component syntax for enhanced features
4. Import any additional React components at the top if needed

Example:
```mdx
---
title: My New Page
description: A description of the page
---

import { CustomComponent } from '../components/CustomComponent';

# My New Page

<Note>
This is an informational note using the Note component.
</Note>

<Tabs>
  <Tab label="JavaScript">
    ```javascript
    console.log('Hello World');
    ```
  </Tab>
  <Tab label="Python">
    ```python
    print('Hello World')
    ```
  </Tab>
</Tabs>

<CustomComponent prop="value" />
```

## Troubleshooting

If you encounter issues:

1. **Build Errors**: Check that all component tags are properly closed
2. **Component Not Found**: Ensure the component is exported in `MDXComponents.tsx`
3. **Syntax Errors**: Verify MDX syntax is correct (components must be properly capitalized)
4. **Missing Styles**: Check that CSS is properly imported in `_app.tsx`

## Future Enhancements

With MDX, we can now easily:

- Add interactive components directly in documentation
- Use TypeScript for component props validation
- Leverage the full React ecosystem
- Create more sophisticated documentation features
- Integrate with additional MDX plugins as needed

This migration provides a more stable and feature-rich foundation for the documentation system.
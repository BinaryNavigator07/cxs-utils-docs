// Schema definitions for Markdoc validation
export const documentSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'The title of the document'
    },
    description: {
      type: 'string',
      description: 'A brief description of the document'
    },
    nav_order: {
      type: 'number',
      description: 'Order in navigation (lower numbers appear first)'
    },
    search_skip: {
      type: 'boolean',
      description: 'Whether to skip this page in search indexing'
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      },
      description: 'Tags for categorizing the document'
    }
  },
  required: ['title']
};

export const validateFrontmatter = (frontmatter) => {
  const errors = [];
  
  if (!frontmatter.title) {
    errors.push('Document must have a title');
  }
  
  if (frontmatter.nav_order && typeof frontmatter.nav_order !== 'number') {
    errors.push('nav_order must be a number');
  }
  
  if (frontmatter.search_skip && typeof frontmatter.search_skip !== 'boolean') {
    errors.push('search_skip must be a boolean');
  }
  
  return errors;
};
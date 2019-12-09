const path = require('path')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const tagTemplate = path.resolve(`./src/templates/tags.js`);
  const categoryTemplate = path.resolve(`./src/templates/category.js`);

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        categoryGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    // handle errors
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    });

    // Extract tag data from query
    const tags = result.data.tagsGroup.group

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    });

    // Extract category data from query
    const categories = result.data.categoryGroup.group

    // Make category pages
    categories.forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category.fieldValue)}/`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
        },
      })
    });
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
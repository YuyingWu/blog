exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /weixin-js-sdk/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}

// This part comes from gatsby-theme-blog-core/gatsby-node.js
const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
      fieldName,
  })
  return result
}

exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions
  createTypes(`interface BlogPost @nodeInterface {
    id: ID!
    title: String!
    body: String!
    slug: String!
    date: Date! @dateformat
    tags: [String]!
    keywords: [String]!
    excerpt: String!
    cover: String!
    categories: [String]!
  }`) // adding heroImage as an optional File field to BlogPost

  createTypes(
      schema.buildObjectType({
          name: `MdxBlogPost`,
          fields: {
              id: {type: `ID!`},
              title: {
                  type: `String!`,
              },
              slug: {
                  type: `String!`,
              },
              date: {type: `Date!`, extensions: {dateformat: {}}},
              tags: {type: `[String]!`},
              categories: {type: `[String]!`},
              keywords: {type: `[String]!`},
              excerpt: {
                  type: `String!`,
                  args: {
                      pruneLength: {
                          type: `Int`,
                          defaultValue: 140,
                      },
                  },
                  resolve: mdxResolverPassthrough(`excerpt`),
              },
              cover: {
                  type: `String!` // adding heroImage as an optional File field to MdxBlogPost
              },
              body: {
                  type: `String!`,
                  resolve: mdxResolverPassthrough(`body`),
              },
          },
          interfaces: [`Node`, `BlogPost`],
      })
  )
}

exports.onCreateNode = async (
  {node, getNode}
) => {
  if (node.internal.type === "MdxBlogPost") {
      const parentNode = getNode(node.parent)
      node.cover = parentNode.frontmatter.cover || ''
      node.categories = parentNode.frontmatter.categories || []
  }
}
import React, { Component } from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

class Tags extends Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { tag } = this.props.pageContext
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h1>{tagHeader}</h1>

        <p style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}>
          <Link to="/tags">>> All tags</Link>
        </p>

        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>        
      </Layout>
    );
  }
}

// const Tags = ({ pageContext, data }) => {
//   const { tag } = pageContext
//   const { edges, totalCount } = data.allMarkdownRemark
//   const tagHeader = `${totalCount} post${
//     totalCount === 1 ? "" : "s"
//   } tagged with "${tag}"`

//   return (
    
//   )
// }

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
import React, { Component } from "react"
import { Styled, css } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import PostFooter from "gatsby-theme-chaton/src/components/post-footer"
import Layout from "gatsby-theme-chaton/src/components/layout"
import SEO from "gatsby-theme-chaton/src/components/seo"
import Tags from 'gatsby-theme-chaton/src/components/tags'

class Post extends Component {
  render() {
    const {
      data: {
        post,
        site: {
          siteMetadata: { title },
        },
      },
      location,
      previous,
      next,
    } = this.props;
    let tags = post.tags || [];

    return (
      <Layout location={location} title={title}>
        <SEO title={post.title} description={post.excerpt} />

        <main>
          <Styled.h1 css={css({
            fontSize: 3,
            color: `primary`,
            mb: 4,
          })}>{post.title}</Styled.h1>
          <Styled.p
            css={css({
              fontSize: 1,
              mt: -3,
              mb: 3,
            })}
          >
            {post.date}
          </Styled.p>

          <Tags tags={tags} />

          <MDXRenderer>{post.body}</MDXRenderer>
        </main>

        <PostFooter {...{ previous, next }} />
      </Layout>
    )
  }
}

export default Post
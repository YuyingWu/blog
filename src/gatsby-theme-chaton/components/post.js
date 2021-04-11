import React from "react"
import ReactDOM from "react-dom"
import { Styled, css } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import PostFooter from "gatsby-theme-chaton/src/components/post-footer"
import Layout from "gatsby-theme-chaton/src/components/layout"
import SEO from "gatsby-theme-chaton/src/components/seo"
import Tags from 'gatsby-theme-chaton/src/components/tags'
import { Link } from "gatsby"
import defaultThemeColors from "gatsby-theme-chaton/src/gatsby-plugin-theme-ui/colors"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  let tags = post.tags || [];
  let height;

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
          {/* <Styled.a as={Link} to="https://wuyuying.com/comment/" css={css({
            px: 2,
            display: 'inline-block',
          })}>>> 前往留言板</Styled.a> */}
        </Styled.p>

        <Tags tags={tags} />

        <MDXRenderer>{post.body}</MDXRenderer>
      </main>

      {/* <iframe
        title="comment"
        style={{
          border: 0,
          // height: '60vh',
          width: '100%',
          margin: '0 auto',
          display: 'block',
          overflowY: 'visible',
        }}
        src={`https://wuyuying.com/comment-source?post=/archives${post.slug}`}
      /> */}

      <PostFooter {...{ previous, next }} />
    </Layout>
  )
}

export default Post
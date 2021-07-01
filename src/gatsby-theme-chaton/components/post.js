import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Styled, css } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Helmet from 'react-helmet'
import PostFooter from "gatsby-theme-chaton/src/components/post-footer"
import Layout from "gatsby-theme-chaton/src/components/layout"
import SEO from "gatsby-theme-chaton/src/components/seo"
import Tags from 'gatsby-theme-chaton/src/components/tags'
import { Link } from "gatsby"
import defaultThemeColors from "gatsby-theme-chaton/src/gatsby-plugin-theme-ui/colors"

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommnetReady: false,
    };
  }

  componentDidMount() {
    if (window.__semio__gc_graphlogin) {
      this.setState({
        isCommnetReady: true,
      }, () => {
        this.loadComment();
      })
    }
  }

  loadComment = () => {
    const { isCommnetReady } = this.state;
    const {
      data: {
        post,
      }
    } = this.props;
    const config = {
      graphcommentId: "wuyuying", // make sure the id is yours

      behaviour: {
        // HIGHLY RECOMMENDED
        uid: post.slug // uniq identifer for the comments thread on your page (ex: your page id)
      },

      // configure your variables here
    }

    isCommnetReady && window.__semio__gc_graphlogin(config);
  }

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
    const { isCommnetReady } = this.state;
    let tags = post.tags || [];

    return (
      <Layout location={location} title={title}>
        <Helmet>
          <script async src={isCommnetReady ? '' : `https://integration.graphcomment.com/gc_graphlogin.js?t=${Date.now()}`} onLoad={`
            var config = {
              graphcommentId: "wuyuying", // make sure the id is yours

              behaviour: {
                // HIGHLY RECOMMENDED
                uid: "${post.slug}" // uniq identifer for the comments thread on your page (ex: your page id)
              },

              // configure your variables here
            }

            window.__semio__gc_graphlogin && window.__semio__gc_graphlogin(config);
          `} />
        </Helmet>

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

        <div id="graphcomment"></div>

        <PostFooter {...{ previous, next }} />
      </Layout>
    )
  }
}

export default Post
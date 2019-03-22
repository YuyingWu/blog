import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { navigate } from 'gatsby'

class NotFoundPage extends React.Component {
  componentDidMount() {
    this.redirectBlogPrefix();
  }

  redirectBlogPrefix() {
    const { pathname } = window.location;
    const regex = /\/blog\/archives/;

    if (regex.test(pathname)) {
      navigate(pathname.replace(regex, ''));
    }
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Oops! 进入了一片荒芜之地...</h1>
        <p>小伍很懒，还没有想好在404放什么有趣的内容~</p>
        <p>你可能想 >> <a href="/">回到首页</a></p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from '../utils/typography'
import Styles from './Bio.module.css';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(1),
              marginTop: rhythm(1),
            }}
            className={Styles.container}
          >
            <Link to="/" style={{ boxShadow: 'none' }}>
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  minWidth: 50,
                  borderRadius: `100%`,
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </Link>
            <p style={{ marginBottom: 0 }}>
              <Link to="/" style={{ color: '#333' }}><strong>{author}</strong></Link> 的个人博客，文字、代码、照片 记录工作和生活 <br />
              你可以在这里关注我：{ Object.keys(social).map(key => <a key={`social-${key}`} href={social[key]} target="_blank" style={{
                marginRight: rhythm(1 / 2),
              }}>{ key }</a>) }
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          douban
          github
          zhihu
        }
      }
    }
  }
`

export default Bio

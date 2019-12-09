import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import { rhythm, scale } from '../utils/typography'
import Nav from '../components/Nav'

function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }

  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const { social } = data.site.siteMetadata;

        return (
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <Helmet>
              <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
              <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
              <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
              <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
              <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
              <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
              <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
              <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
              <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </Helmet>

            {header}

            <Nav />

            {children}

            <footer style={{
              marginTop: rhythm(1),
              textAlign: 'center',
            }}>
              © 2014-{new Date().getFullYear()}, Yuying Wu, 京ICP备16019960号
              <div>
                { Object.keys(social).map(key => <a key={`social-${key}`} href={social[key]} target="_blank" style={{
                  marginRight: rhythm(1 / 2),
                }}>{ key }</a>) }
                <a href="http://wuyuying.com/rss.xml" target="_blank" style={{
                  marginRight: rhythm(1 / 2),
                }}>rss</a>
              </div>
            </footer>
          </div>
        )
      }}
    />
  );
}

class Layout1 extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    console.log(this.props.data);


    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Helmet>
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        </Helmet>

        {header}
        {children}

        <footer style={{
          marginTop: rhythm(1),
          textAlign: 'center',
        }}>
          © 2014-{new Date().getFullYear()}, Yuying Wu, 京ICP备16019960号
        </footer>
      </div>
    )
  }
}

export default Layout

export const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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

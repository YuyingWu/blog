import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { scale } from '../utils/typography'

const Nav = () => {
  return (
    <StaticQuery
      query={navQuery}
      render={data => {
        const { nav = [] } = data.site.siteMetadata;

        return (
          <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
            { nav.map(item => (
              <Link to={item.link} key={`nav-${item.title}`}>{item.title}</Link>
            )) }
          </nav>
        );
      }}
    />
  )
}

export default Nav;

const navQuery = graphql`
  query NavQuery {
    site {
      siteMetadata {
        title
        description
        author
        nav {
          title
          link
        }
      }
    }
  }
`

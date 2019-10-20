import React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from "lodash/kebabCase"
import { scale } from '../utils/typography'

const Categories = ({
  categories = [],
}) => (
  <>
    { categories.length ? (
      <ul style={{
        ...scale(-1 / 5),
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>Categories:</li>
        { categories.map((tag, index) => <li key={`tag-${index}`} style={{ display: 'inline-block' }}>
          <Link to={`/categories/${kebabCase(tag)}/`}>{ tag }</Link>
        </li>)}
      </ul>
    ) : null }
  </>
)

export default Categories;

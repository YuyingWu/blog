import React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from "lodash/kebabCase"
import { scale } from '../utils/typography'

const Categories = ({
  categories = [],
}) => (
  <>
    { categories.length ? (
      <p style={{
        ...scale(-1 / 5),
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        <span style={{ marginRight: '10px' }}>Categories:</span>
        { categories.map((tag, index) => <span key={`tag-${index}`} style={{ marginRight: '10px' }}>
          <Link to={`/categories/${kebabCase(tag)}/`}>{ tag }</Link>
        </span>)}
      </p>
    ) : null }
  </>
)

export default Categories;

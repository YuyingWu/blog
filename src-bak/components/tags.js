import React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from "lodash/kebabCase"
import { scale } from '../utils/typography'

const tags = ({
  tags,
}) => (
  <>
    { tags.length ? (
      <p style={{
        ...scale(-1 / 5),
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        <span style={{ marginRight: '10px' }}>Tags:</span>
        { tags.map((tag, index) => <span style={{ marginRight: '10px' }} key={`tag-${index}`}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{ tag }</Link>
        </span>)}
      </p>
    ) : null }
  </>
)

export default tags;

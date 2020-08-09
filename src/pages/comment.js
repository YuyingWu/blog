import React, { PureComponent } from 'react'
import Header from 'gatsby-theme-chaton/src/components/header'
// import Layout from '../gatsby-theme-chaton/components/layout.js'

export default class extends PureComponent {
  render() {
    return (
      <div>
        <iframe
          title="comment"
          style={{
            border: 0,
            height: '100vh',
            width: '96vw',
            margin: '0 auto',
            display: 'block',
          }}
          src="/comment/index.html"
        />
      </div>
    )
  }
}

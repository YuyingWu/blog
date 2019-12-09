import React, { Component } from 'react'
import { rhythm } from '../utils/typography'

export default class extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <h1>Bonjour, Li Qing,</h1>
        <p>Nice to meet you :)</p>
        <p
         style={{
           textAlign: 'right',
         }}
        >Yours,<br/> Wu Yuying</p>
      </div>
    )
  }
}
import React, { PureComponent } from 'react'

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
          src="/comment-source/index.html"
        />
      </div>
    )
  }
}

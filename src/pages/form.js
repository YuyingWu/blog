import React, { PureComponent } from 'react'

export default class extends PureComponent {
  render() {
    return (
      <form name="contact" netlify>
        <p>
          <label>Name <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Email <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Comment: <textarea name="comment"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    )
  }
}
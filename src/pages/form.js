import React, { PureComponent } from 'react'

export default class extends PureComponent {
  render() {
    return (
      <form name="comments" method="post">
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>Your Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
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
import React from 'react';
import Valine from 'gatsby-plugin-valine';
import { Styled, css } from "theme-ui"

import './index.less';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { slug, visible } = this.props;

    return visible ? (
      <section
        className="wgt-comment"
        css={css({
          mt: 3,
          mb: -4,
        })}>
        <h2>评论区</h2>
        <Valine path={`/archives${slug}`} className="v-comment" />
      </section>
    ) : null
  }
}
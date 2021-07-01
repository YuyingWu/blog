import React, { PureComponent } from 'react'
import { css, Styled } from 'theme-ui'
import Header from 'gatsby-theme-chaton/src/components/header'
// import axios from 'axios';
// import Helmet from 'react-helmet'

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: (new Date()).getTime(),
      nonceStr: 'abc',
      signature: '',
      url: props.location.href || 'https://wuyuying.com',
    }
  }

  // componentWillMount() {
  //   const { timestamp, nonceStr, url } = this.state;

  //   axios.get(`http://192.168.31.126:3000/weixin?timestamp=${timestamp}&nonceStr=${nonceStr}&url=${url}`).then(res => {
  //     if (res && res.data && res.data.signiture) {
  //       this.setState({
  //         signature: res.data.signiture,
  //       });
  //     }
  //   });
  // }

  render() {
    const { children, ...props } = this.props;
    // const { url, timestamp, nonceStr, signature } = this.state;

    // console.log(this.state);

    return (
      <Styled.root>
        <Header {...props} />
        <div>
          <div
            css={css({
              maxWidth: `container`,
              mx: `auto`,
              px: 2,
              py: 3,
            })}
          >
            {children}
          </div>
        </div>
      </Styled.root>
    )
  }
}

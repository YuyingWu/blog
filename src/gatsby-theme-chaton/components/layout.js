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
        {/* <Helmet>
          <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
          <script>
            {`
            if (${signature}) {
              wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxdb676b2df4a9119f', // 必填，公众号的唯一标识
                timestamp: '${timestamp}', // 必填，生成签名的时间戳
                nonceStr: '${nonceStr}', // 必填，生成签名的随机串
                signature: '${signature}',// 必填，签名
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
              });
              wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
                wx.updateAppMessageShareData({
                  title: 'Yuying Wu', // 分享标题
                  desc: '', // 分享描述
                  link: '${url}', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://wuyuying.com/favicon-96x96.png', // 分享图标
                  success: function () {
                    // 设置成功
                  }
                });
                wx.updateTimelineShareData({ 
                  title: 'Yuying Wu', // 分享标题
                  link: '${url}', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://wuyuying.com/favicon-96x96.png', // 分享图标
                  success: function () {
                    // 设置成功
                  }
                })
              });
            }
            `}
          </script>
        </Helmet> */}
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

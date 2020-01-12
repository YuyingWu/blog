import React from 'react'
import { css, Styled } from 'theme-ui'
import Header from 'gatsby-theme-chaton/src/components/header'
import Helmet from 'react-helmet'

export default ({ children, ...props }) => (
  <Styled.root>
    <Helmet>
      <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
      <script>
        {`
        wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: 'Yuying Wu', // 分享标题
            desc: '', // 分享描述
            link: 'https://wuyuying.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://wuyuying.com/favicon-96x96.png', // 分享图标
            success: function () {
              // 设置成功
            }
          });
          wx.updateTimelineShareData({ 
            title: 'Yuying Wu', // 分享标题
            link: 'https://wuyuying.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://wuyuying.com/favicon-96x96.png', // 分享图标
            success: function () {
              // 设置成功
            }
          })
        });
        `}
      </script>
    </Helmet>
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

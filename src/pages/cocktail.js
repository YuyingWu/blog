import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { graphql } from "gatsby";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CocktailCard from '../components/cocktail-card';
import cocktailTheme from '../utils/cocktailTheme';
import wx from 'weixin-js-sdk';

const HEADER_HEIGHT = '20vh';
const styles = {
  root: {
    // backgroundColor: '#E2DDCC',
    backgroundColor: cocktailTheme.red,
    fontFamily: 'Bradley Hand, cursive, futura-pt-bold, sans-serif',
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: cocktailTheme.black,
    marginBottom: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    lineHeight: HEADER_HEIGHT,
  },
  logo: {
    display: 'inline-block',
    width: HEADER_HEIGHT,
    height: HEADER_HEIGHT,
    marginRight: 20,
  },
  logoSmall: {
    display: 'inline-block',
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: -7,
  },
  headerTitle: {
    textAlign: 'left',
    color: cocktailTheme.red,
    // lineHeight: HEADER_HEIGHT,
    margin: 0,
    fontSize: 60,
  },
  headerTitleSmall: {
    color: cocktailTheme.red,
    lineHeight: 1,
    fontSize: 32,
    fontWeight: 700,
  },
  footer: {
    backgroundColor: cocktailTheme.black,
    padding: '20px 0',
    textAlign: 'center',
    color: cocktailTheme.gray,
    marginTop: '16px',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.syncWX();
  }

  syncWX = async () => {
    const res = await axios.get(`https://server.wuyuying.com/wx/signature?url=${encodeURIComponent(window.location.href)}`);
    const { data = {} } = res;

    wx.config(Object.assign(data, {
      debug: true,
      jsApiList: [
        // 'updateAppMessageShareData',
        // 'updateTimelineShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    }))

    wx.checkJsApi({
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        alert('api success ' + JSON.stringify(res))
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      },

    });

    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: 'Keep', // 分享标题
        link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://wuyuying.com/static/d07198b678ca849341724d014eb9a47e/eee8e/avatar.jpg', // 分享图标
        success: function () {
          // 用户点击了分享后执行的回调函数
          alert('朋友圈成功');
        }
      });

      wx.onMenuShareAppMessage({
        title: 'Keep', // 分享标题
        desc: 'Keep', // 分享描述
        link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://wuyuying.com/static/d07198b678ca849341724d014eb9a47e/eee8e/avatar.jpg', // 分享图标
        // type: '', // 分享类型,music、video或link，不填默认为link
        // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户点击了分享后执行的回调函数
          alert('好友成功')
        }
      });      

      // wx.updateAppMessageShareData({
      //   title: 'Keep', // 分享标题
      //   desc: 'Keep', // 分享描述
      //   link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: 'https://wuyuying.com/static/d07198b678ca849341724d014eb9a47e/eee8e/avatar.jpg', // 分享图标
      //   success: function () {
      //     // 设置成功
      //     alert('好友成功')
      //   }
      // })

      // wx.updateTimelineShareData({
      //   title: 'Keep', // 分享标题
      //   link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: 'https://wuyuying.com/static/d07198b678ca849341724d014eb9a47e/eee8e/avatar.jpg', // 分享图标
      //   success: function () {
      //     // 设置成功
      //     alert('朋友圈成功')
      //   }
      // });
    });
  }

  render() {
    const { classes, data } = this.props;
    const { allMdx: { edges: list = [] } = {} } = data;
    const sortDescDateList = list.sort((a, b) => {
      const aDate = (new Date(a.node.frontmatter.date)).getTime();
      const bDate = (new Date(b.node.frontmatter.date)).getTime();

      return bDate - aDate;
    });

    return (
      <div className={classes.root}>
        <CssBaseline />
        <header className={classes.headerContainer}>
          <Container maxWidth="md" className={classes.header}>
            <Hidden only={['sm', 'xs']}>
              <img className={classes.logo} src="https://static.wuyuying.com/cocktail-logo.png" />
              <h1 className={classes.headerTitle}>Home Bar Cocktail</h1>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
              <img className={classes.logoSmall} src="https://static.wuyuying.com/cocktail-logo.png" />
              <h1 className={classes.headerTitleSmall}>Home Bar Cocktail</h1>
            </Hidden>
          </Container>
        </header>

        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {sortDescDateList.map(card => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={card.node.slug}>
                <CocktailCard body={card.node.body} excerpt={card.node.excerpt} slug={card.node.slug} {...card.node.frontmatter} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <footer>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.footer}>Power by <a href="https://wuyuying.com/" target="_blank" style={{ color: '#fff' }}>wuyuying.com.</a>
          </Typography>
        </footer>
      </div>
    )
  }
}

export default withStyles(styles)(App);

export const pageQuery = graphql`
  {
    allMdx(filter: {frontmatter: {categories: {in: "cocktail"}}}) {
      edges {
        node {
          frontmatter {
            title
            categories
            cover
            tags
            date
          }
          excerpt(truncate: true, pruneLength: 55)
          slug
          body
        }
      }
    }
  }
`;
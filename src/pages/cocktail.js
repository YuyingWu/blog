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

    // alert(JSON.stringify(res));

    console.log(Object.assign({
      debug: true,
      // appId: 'wxdb676b2df4a9119f',
      // timestamp: (new Date()).getTime(),
      // nonceStr: res.nonceStr,
      // signature: '2c768e67f6cd86f7fb3daa2c69429718',
      // jsApiList: [
      //   'checkJsApi',
      //   'onMenuShareTimeline',
      // ],
    }, data));

    // if (res != null) {
      wx.config(Object.assign({
        debug: true,
        // appId: 'wxdb676b2df4a9119f',
        // timestamp: (new Date()).getTime(),
        // nonceStr: res.nonceStr,
        // signature: '2c768e67f6cd86f7fb3daa2c69429718',
        // jsApiList: [
        //   'checkJsApi',
        //   'onMenuShareTimeline',
        // ],
      }, data))

      wx.ready(function () {

        window.log && window.log('wx ready');

        alert('wx ready');

        wx.updateAppMessageShareData({ 
          title: 'Keep', // 分享标题
          desc: 'Keep', // 分享描述
          link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://sf4c.gotokeep.com/qq_default.png', // 分享图标
          success: function () {
            // 设置成功
            alert('好友成功')
          }
        })

        wx.updateTimelineShareData({ 
          title: 'Keep', // 分享标题
          link: 'https://wuyuying.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://sf4c.gotokeep.com/qq_default.png', // 分享图标
          success: function () {
            // 设置成功
            alert('朋友圈成功')
          }
        })
  
        // wx.onMenuShareTimeline({
        //   title: 'Keep',
        //   link: 'https://www.gotokeep.com/',
        //   imgUrl: 'http://sf4c.gotokeep.com/qq_default.png'
        // });
      });
    // }
    // axios.get(`https://server.wuyuying.com/wx/signature?url=${encodeURIComponent(window.location.href)}`)
    // .then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.error(error);
    // });
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
            { sortDescDateList.map(card => (
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
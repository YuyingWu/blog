import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { graphql } from "gatsby";
import Typography from '@material-ui/core/Typography';
import CocktailCard from '../components/cocktail-card';

const HEADER_HEIGHT = '20vh';
const styles = {
  root: {
    backgroundColor: '#E2DDCC',
    fontFamily: 'Bradley Hand, cursive, futura-pt-bold, sans-serif',
  },
  paper: {
    height: 140,
    width: 100,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: '#000',
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
    width: 120,
    height: 120,
  },
  logoSmall: {
    display: 'inline-block',
    width: 100,
    height: 100,
  },
  headerTitle: {
    textAlign: 'left',
    color: '#C93801',
    // lineHeight: HEADER_HEIGHT,
    margin: 0,
    fontSize: 60,
  },
  headerTitleSmall: {
    color: '#C93801',
    lineHeight: 1,
    fontSize: 24,
  },
  footer: {
    backgroundColor: '#000',
    padding: '20px 0',
    textAlign: 'center',
    color: '#fff',
    marginTop: '16px',
  }
};


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, data } = this.props;
    const { allMdx: { edges: list = [] } = {} } = data;

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
            { list.map(card => (
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
    allMdx(filter: {frontmatter: {categories: {in: "foodie"}}}) {
      edges {
        node {
          frontmatter {
            title
            categories
            cover
            tags
            date
          }
          excerpt(truncate: true)
          slug
          body
        }
      }
    }
  }
`;
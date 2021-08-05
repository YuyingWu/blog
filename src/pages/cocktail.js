import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import CocktailCard from '../components/cocktail-card';

const HEADER_HEIGHT = '40vh';
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
    // fontSize: 30,
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
  headerTitle: {
    textAlign: 'left',
    color: '#C93801',
    // lineHeight: HEADER_HEIGHT,
    margin: 0,
  }
};


class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <header className={classes.headerContainer}>
          <Container maxWidth="md" className={classes.header}>
            <img className={classes.logo} src="https://static.wuyuying.com/cocktail-logo.png" />
            <Hidden xsUp>
              <h1 className={classes.headerTitle}>Home Bar Cocktail</h1>
            </Hidden>
          </Container>
        </header>

        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CocktailCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CocktailCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CocktailCard />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CocktailCard />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(App);
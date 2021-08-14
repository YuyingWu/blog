import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from 'moment'
import cocktailTheme from '../../utils/cocktailTheme';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const FONT_FAMILY = 'SF Pro SC,SF Pro Display,SF Pro Icons,AOS Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: cocktailTheme.black,
    border: `2px solid ${cocktailTheme.yellow}`,
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop: '100%', // 1:1
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  excerpt: {
    height: 50,
    color: cocktailTheme.gray,
    fontFamily: FONT_FAMILY,
  },
  title: {
    color: cocktailTheme.red,
    textDecoration: 'none',
    fontWeight: 700,
    fontFamily: FONT_FAMILY,
  },
  date: {
    color: cocktailTheme.gray,
    fontSize: 12,
    fontFamily: FONT_FAMILY,
  }
}));

export default function RecipeReviewCard({
  slug,
  title,
  body,
  cover,
  // tags,
  date,
  excerpt,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div aria-label="recipe">
            <Avatar alt="Yuying Wu" src="https://wuyuying.com/static/d07198b678ca849341724d014eb9a47e/eee8e/avatar.jpg" />
          </div>
        }
        action={null}
        title={<a href={`https://wuyuying.com/${slug}`} target="_blank" className={classes.title}>{title}</a>}
        subheader={<span className={classes.date}>{moment(date).format('YYYY/MM/DD')}</span>}
      />
      <CardMedia
        className={classes.media}
        image={cover || 'https://material-ui.com/static/images/cards/paella.jpg'}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.excerpt}>{ excerpt }
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> */}
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="caption" color="textSecondary" component="p">
            <MDXRenderer>{body}</MDXRenderer>
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

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
import { MDXRenderer } from "gatsby-plugin-mdx"
import moment from 'moment'
import cocktailTheme from '../../utils/cocktailTheme';
import { Link } from "gatsby"
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const FONT_FAMILY = 'SF Pro SC,SF Pro Display,SF Pro Icons,AOS Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
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
  body: {
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
  },
  avatar: {
    border: `1px solid ${cocktailTheme.yellow}`,
    borderRadius: '50%',
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
  cardType = 'excerpt',
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
          <div aria-label="recipe" className={classes.avatar}>
            <Avatar alt="Yuying Wu" src="https://static.wuyuying.com/avatar.jpeg" />
          </div>
        }
        action={null}
        title={<Link to={`/cocktail?id=${slug}`} className={classes.title}>{title}</Link>}
        subheader={<span className={classes.date}>{moment(date).format('YYYY/MM/DD')}</span>}
      />

      { cardType !== 'excerpt' ? (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
            <MDXRenderer>{body}</MDXRenderer>
          </Typography>
        </CardContent>
      ) : null }

      <CardMedia
        className={classes.media}
        image={cover}
        title={title}
      />

      { cardType === 'excerpt' ? (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.excerpt}>{ excerpt }
          </Typography>
        </CardContent>
      ) : null }

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

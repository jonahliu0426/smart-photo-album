import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { LoadingLargeIcon } from "../../icons";
import { useFollowSuggestionsStyles } from "../../styles";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

function FollowSuggestions({ hideHeader, noBackground }) {
  const classes = useFollowSuggestionsStyles();
  let loading = false;

  return (
    <div className={!noBackground ? classes.wrapper : undefined}>
      <div className={classes.container}>
        {!hideHeader && <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typographySuggestion}
        >
          Suggestions For You
        </Typography>}
        {loading ? (
          <LoadingLargeIcon />
        ) : (
          <Slider
            className={classes.slide}
            dots={false}
            infinite
            speed={1000}
            touchThreshold={1000}
            variableWidth
            swipeToslide
            arrows
            slidesToScroll={2}
            easing="ease-in-out"
          >
            {Array.from({ length: 8 }, () => getDefaultUser()).map(user => (
              <FollowSuggestionsItem key={user.id} user={user} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  )
}

export const FollowSuggestionsItem = ({ user }) => {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name } = user;

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${username}`}>
          <Avatar
            src={profile_image}
            alt={`${username}'s profile`}
            classes={{
              root: classes.avatar,
              img: classes.avatarImg
            }}
          />
        </Link>
        <Link to={`/${username}`}>
          <Typography
            variant="subtitle2"
            className={classes.text}
            align="center"
          >
            {username}
          </Typography>
        </Link >
        <Typography color="textSecondary" variant="body2" className={classes.text}
          align="center"
        >
          {name}
        </Typography>
        <FollowButton side={false} />
      </div>
    </div>
  )

}
export default FollowSuggestions;

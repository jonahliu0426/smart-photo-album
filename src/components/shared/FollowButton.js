import { Button } from "@material-ui/core";
import React from "react";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setFolloing] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const FollowButton = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={() => setFolloing(true)}
      fullWidth
    >
      Follow
    </Button>
  )

  const FollowingButton = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.followingButton}
      onClick={() => setFolloing(false)}
      fullWidth
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}

    >
      {hover ? "Unfollow" : "Following"}
    </Button>
  )

  return isFollowing ? FollowingButton : FollowButton;
}

export default FollowButton;

import { Typography } from "@material-ui/core";
import React from "react";
import { getDefaultPost } from "../../data";
import { LoadingLargeIcon } from "../../icons";
import { useExploreGridStyles } from "../../styles";
import GridPost from "../shared/GridPost"


function ExploreGrid() {
  const classes = useExploreGridStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeOut = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeOut);
  }, [])

  return (
    <>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        Search Result
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {Array.from({ length: 20 }, () => getDefaultPost()).map(post => (
              <GridPost key={post.id} post={post} />
            ))}
          </div>
        </article>
      )}
    </>
  )
}

export default ExploreGrid;

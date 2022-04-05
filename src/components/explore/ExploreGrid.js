import { Typography } from "@material-ui/core";
import React from "react";
import { getDefaultPost } from "../../data";
import { LoadingLargeIcon } from "../../icons";
import { useExploreGridStyles } from "../../styles";
import GridPost from "../shared/GridPost"
import { ResultContext } from "../../App";


function ExploreGrid() {
  const { state, dispatch } = React.useContext(ResultContext);
  const classes = useExploreGridStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeOut = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeOut);
  }, [])
  console.log('state', state);
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
            {state?.searchResult?.map((post, idx) => (
              //<span>{post}</span>
              <GridPost key={idx} post={post} />
            ))}
          </div>
        </article>
      )}
    </>
  )
}

export default ExploreGrid;

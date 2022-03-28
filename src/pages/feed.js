import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { getDefaultPost } from "../data";
import { Hidden } from "@material-ui/core";
import UserCard from "../components/shared/UserCard";
//import FeedPost from "../components/feed/FeedPost";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions"
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfPage] = React.useState(false);

  let loading = false;

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post, index) => (
            <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost index={index} post={post} />
            </React.Suspense>
          ))}
        </div>
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfPage && <LoadingLargeIcon />}
      </div>
    </Layout>
  )
}

export default FeedPage;

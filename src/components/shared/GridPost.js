import { Typography } from "@material-ui/core";
import React from "react";
import { useGridPostStyles } from "../../styles";
import { useHistory } from "react-router-dom";

function GridPost({ post }) {
  const history = useHistory();
  const object_key = typeof (post) === 'string' ? post.slice(post.lastIndexOf('/') + 1) : '';
  const classes = useGridPostStyles();
  console.log(post);
  console.log(object_key)

  const handleOpenPostModal = () => {
    const object_key = typeof (post) === 'string' ? post.slice(post.lastIndexOf('/') + 1) : '';
    console.log('post', post);
    console.log('object key, ', object_key);
    history.push({
      pathname: `/p/${object_key}`,
      state: { modal: true }
    })
  }


  return (
    <div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          {/* <Typography>{likes}</Typography> */}
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          {/* <Typography>{comments.length}</Typography> */}
        </div>
      </div>
      <img src={post} alt="Post cover" className={classes.image} />
    </div>
  )
}

export default GridPost;

import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { MoreIcon, CommentIcon, ShareIcon, UnlikeIcon, LikeIcon, SaveIcon, RemoveIcon } from "../../icons";
import OptionDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import PostSkeleton from "./PostSkeleton";

function Post() {
  const classes = usePostStyles();
  const [loading, setLoading] = React.useState(true);
  // const { id, media, likes, user, caption, comments } = defaultPost;
  const [showOptionDialog, setShowOptionDialog] = React.useState(false);
  const { postId } = useParams();

  setTimeout(() => setLoading(false), 500);

  if (loading) return <PostSkeleton />;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={classes.postImage}>
        <img src={'https://smart-photo-album-storage.s3.amazonaws.com/' + postId} alt="Post media" className={classes.Image} />
      </div>
    </div>
  )
}

// const LikeButton = () => {
//   const classes = usePostStyles();
//   const [liked, setLiked] = React.useState(false);
//   const Icon = liked ? UnlikeIcon : LikeIcon;
//   const className = liked ? classes.liked : classes.like;

//   const handleLike = () => {
//     setLiked(true)
//   }

//   const handleUnlike = () => {
//     setLiked(false);
//   }

//   const onClick = liked ? handleUnlike : handleLike;

//   return <Icon className={className} onClick={onClick} />
// }

// const SaveButton = () => {
//   const classes = usePostStyles();
//   const [saved, setSaved] = React.useState(false);
//   const Icon = saved ? RemoveIcon : SaveIcon;

//   const handleSave = () => {
//     setSaved(true)
//   }

//   const handleRemove = () => {
//     setSaved(false);
//   }

//   const onClick = saved ? handleRemove : handleSave;

//   return <Icon className={classes.saveIcon} onClick={onClick} />
// }

// const Comment = () => {
//   const classes = usePostStyles();
//   const [content, setContent] = React.useState('');

//   return (
//     <div className={classes.commentContainer}>
//       <TextField
//         fullWidth
//         value={content}
//         placeholder="Add a comment"
//         multiline
//         rowsMax={2}
//         rows={1}
//         className={classes.textField}
//         onChange={event => setContent(event.target.value)}
//         InputProps={{
//           classes: {
//             root: classes.root,
//             underline: classes.underline
//           }
//         }}
//       />
//       <Button
//         color="primary"
//         className={classes.commentButton}
//         disabled={!content.trim()}
//       >
//         Post
//       </Button>
//     </div>)
// }

export default Post;

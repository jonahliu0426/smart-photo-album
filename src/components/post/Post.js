import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { MoreIcon, CommentIcon, ShareIcon, UnlikeIcon, LikeIcon, SaveIcon, RemoveIcon } from "../../icons";
import OptionDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import PostSkeleton from "./PostSkeleton";

function Post() {
  const classes = usePostStyles();
  const [loading, setLoading] = React.useState(true);
  const { id, media, likes, user, caption, comments } = defaultPost;
  const [showOptionDialog, setShowOptionDialog] = React.useState(false);

  setTimeout(() => setLoading(false), 2000);

  if (loading) return <PostSkeleton />;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon
            className={classes.MoreIcon}
            onClick={() => setShowOptionDialog(true)}
          />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Post Button */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          {/* Post Likes Count */}
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>
          {/* Post Caption */}
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="subtitle2"
              component="span"
              className={classes.postCaption}
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          </div>
          {comments.map(comment => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography>
                  {comment.user.name}
                </Typography>
                <Typography>
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
          {/* Post Comment Area */}

          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>

      </article>
      {showOptionDialog && <OptionDialog onClose={() => setShowOptionDialog(false)} />}
    </div>
  )
}

const LikeButton = () => {
  const classes = usePostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;

  const handleLike = () => {
    setLiked(true)
  }

  const handleUnlike = () => {
    setLiked(false);
  }

  const onClick = liked ? handleUnlike : handleLike;

  return <Icon className={className} onClick={onClick} />
}

const SaveButton = () => {
  const classes = usePostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;

  const handleSave = () => {
    setSaved(true)
  }

  const handleRemove = () => {
    setSaved(false);
  }

  const onClick = saved ? handleRemove : handleSave;

  return <Icon className={classes.saveIcon} onClick={onClick} />
}

const Comment = () => {
  const classes = usePostStyles();
  const [content, setContent] = React.useState('');

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment"
        multiline
        rowsMax={2}
        rows={1}
        className={classes.textField}
        onChange={event => setContent(event.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>)
}

export default Post;

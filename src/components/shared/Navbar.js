import { AppBar, Button, Avatar, Fade, Grid, Hidden, InputBase, Typography, Zoom } from "@material-ui/core";
import React from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import { Link, useHistory } from 'react-router-dom';
import { AddIcon, ExploreActiveIcon, ExploreIcon, HomeActiveIcon, HomeIcon, LikeActiveIcon, LikeIcon, LoadingIcon } from "../../icons";
import { defaultCurrentUser, getDefaultUser } from "../../data";
import { useNProgress } from "@tanem/react-nprogress";
import { Mic } from "@material-ui/icons";
import UploadPhotoDialog from "../post/UploadPhotoDialog"
import { ResultContext } from "../../App";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const path = history.location.pathname;
  const [isLoadingPage, setLoadingPage] = React.useState(true);

  React.useEffect(() => {
    setLoadingPage(false);
  }, [path])

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  )
}

const Logo = () => {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <Typography className={classes.typography} variant="h5" component="span" color="textSecondary">
            Smart Photo
          </Typography>
          {/* <img src={logo} alt="Instagram logo" className={classes.logo} /> */}
        </div>
      </Link>
    </div>
  )
}

const Search = ({ history }) => {
  const { state, dispatch } = React.useContext(ResultContext);
  const classes = useNavbarStyles();
  const [loading] = React.useState(false);
  const [results, setResults] = React.useState([])
  const [query, setQuery] = React.useState('');

  const hasResults = Boolean(query) && results.length > 0;

  React.useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()))
  }, [query])

  const handleClearInput = () => {
    setQuery('');
  }

  const handleClickMic = () => {
    console.log('mic')
  }

  const handleClickSearch = async () => {
    setQuery("");
    try {
      const fr = new FileReader();
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch(`https://urmkm2ivv6.execute-api.us-east-1.amazonaws.com/beta/search?query=${query}`, requestOptions)
      const data = await response.json();
      dispatch({ type: "ADD_RESULTS", payload: { data } })
      console.log(data);
    } catch (err) {
      console.error(err)
    }

  }

  return (
    <Hidden xsDown>
      {/* <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map(result => (
                <Grid key={result.id} item className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2" color="textSecondary">{result.name}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      > */}
      <InputBase
        className={classes.input}
        onChange={event => setQuery(event.target.value)}
        startAdornment={<span className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <>
              <LoadingIcon />
              <Button variant="coutlined" style={{ padding: "6px 12px" }}>
                <Mic />
              </Button>
            </>
          ) : (
            <>
              <span onClick={handleClearInput} className={classes.clearIcon} />
              <div onClick={handleClickMic}>
                <Button variant="coutlined" style={{ padding: "6px 12px" }}>
                  <Mic />
                </Button>
              </div>
            </>
          )
        }
        value={query}
        placeholder="Search"
      >
      </InputBase>
      <Button color="primary" variant="contained" onClick={handleClickSearch}>
        Search
      </Button>
      {/* </WhiteTooltip> */}
    </Hidden>
  )
}

const Links = ({ path }) => {
  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(true);
  const inputRef = React.useRef();
  const [media, setMedia] = React.useState(null);
  const [showUploadDialog, setShowUploadDialog] = React.useState(false);


  const handleToggleList = () => {
    setShowList(prev => !prev);
  }

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const handleHideTooltip = () => {
    setShowTooltip(false);
  }

  function handleHideList() {
    setShowList(false);
  }

  const openFileInput = () => {
    inputRef.current.click();
  }

  const handleUploadPhoto = (event) => {
    setMedia(event.target.files[0]);
    setShowUploadDialog(true);
  }

  const handleClose = () => {
    setShowUploadDialog(false);
  }

  return (
    <div className={classes.linksContainer}>
      {/* {showList && <NotificationList handleHideList={handleHideList} />} */}
      <div className={classes.linksWrapper}>
        {showUploadDialog && (
          <UploadPhotoDialog media={media} handleClose={handleClose} />
        )}
        <Hidden xsDown>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleUploadPhoto}
          />
          <Button onClick={openFileInput}>
            <AddIcon />
            <span>&nbsp;&nbsp;</span>
            <Typography variant="body1" component="span" color="textPrimary">
              Upload
            </Typography>
          </Button>
        </Hidden>
        <Link to="/">
          {path === '/' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        {/* <Link to="/explore">
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link> */}
        {/* <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div className={path === `/${defaultCurrentUser.username}` ?
            classes.profileActive : ""}>
          </div>
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link> */}
      </div>
    </div>
  )
}

const Progress = ({ isAnimating }) => {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  })

  return (
    <div className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  )
}

export default Navbar;

import React from "react";
import { Switch, Route } from "react-router-dom"
import ExplorePage from "./pages/explore"
import PostPage from "./pages/post"

import NotFoundPage from "./pages/not-found";
import { useHistory, useLocation } from "react-router-dom";
import PostModal from "./components/post/PostModal";

function App() {
  const history = useHistory();
  const location = useLocation();
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    if (!history.action !== 'POP' && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={ExplorePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </>
  )
}

export default App;

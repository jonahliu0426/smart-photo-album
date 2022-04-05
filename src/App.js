import React from "react";
import { Switch, Route } from "react-router-dom";
import ExplorePage from "./pages/explore";
import PostPage from "./pages/post";
import NotFoundPage from "./pages/not-found";
import { useHistory, useLocation } from "react-router-dom";
import PostModal from "./components/post/PostModal";
import resultReducer from "./reducer";

export const ResultContext = React.createContext({
  searchResult: []
})

function App() {
  const initialResultState = React.useContext(ResultContext);
  const [state, dispatch] = React.useReducer(resultReducer, initialResultState)
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
    <ResultContext.Provider value={{ state, dispatch }}>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={ExplorePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </ResultContext.Provider>
  )
}

export default App;

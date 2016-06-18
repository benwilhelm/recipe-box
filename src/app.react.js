import React              from "react";
import ReactDOM           from "react-dom";
import {Router, Route, browserHistory} from "react-router";

import Layout   from "./react_components/layout.react.js";
import RecipeGroup from "./react_components/recipe-group.react.js";


class RecipeBox extends React.Component {
  
  render() {    
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout} >
          <Route path="sheets/:sheetId" component={RecipeGroup} />
        </Route>
      </Router>
    )
  }
  
}

ReactDOM.render(<RecipeBox />, document.getElementById("react_app"))

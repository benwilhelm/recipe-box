import React              from "react";
import ReactDOM           from "react-dom";
import {Router, Route, hashHistory} from "react-router";

import Layout   from "./react_components/layout.react.js";
import RecipeGroup from "./react_components/recipe-group.react.js";
import store from "./store.js";

class RecipeBox extends React.Component {
  
  sheetTransitionHandler(transition) {
    var sheetId = transition.params.sheetId;
    store.dispatch({
      type: "SET_ACTIVE_SHEET",
      sheetId: sheetId
    })
  }
  
  render() {    
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout} >
          <Route path="sheets/:sheetId" 
                 component={RecipeGroup} 
                 onEnter={this.sheetTransitionHandler} />
        </Route>
      </Router>
    )
  }
  
}

ReactDOM.render(<RecipeBox />, document.getElementById("react_app"))

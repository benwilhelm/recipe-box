import React from "react";
import ReactDOM from "react-dom";
import Recipe from "./react_components/recipe.react.js";

class RecipeBox extends React.Component {
  
  render() {
    return (
      <div>
        <h1>What's For Dinner?</h1>  
        <Recipe />
      </div>
    )
  }
  
}

ReactDOM.render(<RecipeBox />, document.getElementById("react_app"))

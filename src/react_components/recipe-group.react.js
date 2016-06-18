import React        from 'react';

import Menu         from "./menu.react.js";
import Recipe       from "./recipe.react.js";
import ButtonNo     from "./button/no.react.js";

class RecipeGroup extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>        
        <hr />
        <h1 id="app_title">What's For Dinner?</h1>  
        <Recipe recipe={this.props.selectedRecipe} />
        
        <div id="no_container">
          <div className="inner">
            <ButtonNo onClick={this.props.onNextRecipe} />
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeGroup;

import React from 'react'
import ButtonYes from "./button/yes.react.js";

class Recipe extends React.Component {
  
  render() {
    
    var recipe = this.props.recipe;
    
    return (
      <div id="recipe">
        <h2 className='title'>{recipe.title}?</h2>
      </div>
    )
  }

}

export default Recipe;

import React        from 'react';

import Menu         from "./menu.react.js";
import Recipe       from "./recipe.react.js";
import ButtonNo     from "./button/no.react.js";

class RecipeGroup extends React.Component {
  
  constructor(props) {
    super(props)
    this.nextRecipe = this.nextRecipe.bind(this);
    this.state = {
      selectedRecipe: null
    }
  }
  
  componentDidMount() {
    this.nextRecipe();
  }
  
  nextRecipe() {
    var sheetId = this.props.params.sheetId;
    var recipes = this.props.recipes[sheetId]
    var idx = Math.floor(Math.random() * recipes.length)
    this.setState({ selectedRecipe: recipes[idx] })
  }

  
  render() {
    if (!this.state.selectedRecipe) {
      return null;
    }
    
    return (
      <div>        
        <hr />
        <h1 id="app_title">What's For Dinner?</h1>  
        <Recipe recipe={this.state.selectedRecipe} />
        
        <div id="no_container">
          <div className="inner">
            <ButtonNo onClick={this.nextRecipe} />
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeGroup;

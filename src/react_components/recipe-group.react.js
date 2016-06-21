import React        from 'react';
import { connect }  from 'react-redux';

import Menu         from "./menu.react.js";
import Recipe       from "./recipe.react.js";
import ButtonNo     from "./button/no.react.js";
import store        from "../store.js"

class RecipeGroup extends React.Component {
  
  constructor(props) {
    super(props)
    this.nextRecipe = this.nextRecipe.bind(this);
    this.state = {
      selectedRecipe: null
    }
    
    store.subscribe(() => {
      this.setState({
        selectedRecipe: store.getState().recipes.selectedRecipe
      })
    })
  }
    
  nextRecipe() {
    store.dispatch({ type: 'NEXT_RECIPE' })
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

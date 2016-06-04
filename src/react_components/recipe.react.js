import React from 'react'
import ButtonYes from "./button/yes.react.js";
import ButtonNo from "./button/no.react.js";


var stubRecipes = [
  { title: "Lasagna" },
  { title: "Pasta with that chunky, lemony 5-min tomato sauce" },
  { title: "Fancy ramen" },
  { title: "Veggie burgers" },
  { title: "that tofu/soba dish" },
  { title: "Breakfast tacos" },
  { title: "Roast a whole chicken" },
  { title: "Clean pulled chicken (for tacos, etc)" },
  { title: "Omlette" },
  { title: "Fritata" },
  { title: "Jamaican black bean soup" },
  { title: "Homemade pizza" },
  { title: "Middle eastern snacks " },
  { title: "Butterfly pasta" },
  { title: "Gorgonzola pasta with greens, walnuts and lemon " },
  { title: "Chili" },
  { title: "Avocado asparagus tartine" },
  { title: "one pot farro and tomato dish (smitten kitchen)" },
  { title: "Ribolita" },
  { title: "Lemon mushroom cream freehand pasta " },
  { title: "zaterains black bean and rice mix" },
  { title: "Chicken w/ gen tsao sauce " },
  { title: "Salmon with yogurt dill sauce " },
  { title: "Quinoa & blackbean chipotle salad" },
  { title: "Tuna steaks " },
  { title: "Quinoa with goat cheese, grilled veggies and awesome sauce " },
]

class Recipe extends React.Component {
  
  constructor(props) {
    super(props)
    this.pickRecipe = this.pickRecipe.bind(this);
    this.nextRecipe = this.nextRecipe.bind(this);
    this.state = {
      recipe: this.pickRecipe()
    }
  }
  
  render() {
    
    var recipe = this.state.recipe;
    
    return (
      <div>
        <p>is it...</p>
        <h2>{recipe.title}?</h2>
        
        <div className="row">
          <div className="col-xs-6">
            <ButtonYes href={ recipe.href } />
          </div>
          <div className="col-xs-6">
            <ButtonNo onClick={this.nextRecipe} />
          </div>
        </div>
        
      </div>
    )
  }


  pickRecipe() {
    var idx = Math.floor(Math.random() * stubRecipes.length)
    return stubRecipes[idx];
  }
  
  nextRecipe() {
    console.log('rejected!')
    var recipe = this.pickRecipe();
    this.setState({ recipe: recipe })
  }

}

export default Recipe;

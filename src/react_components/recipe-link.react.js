import React from 'react';

class RecipeLink extends React.Component {
  
  render() {
    if (!this.props.href) {
      return null;
    }
    
    return (
      <a href={this.props.href} className='recipe-link' target="_blank">I can't remember. Show me.</a>
    )
  }
}

export default RecipeLink;

import React from 'react'

class ButtonYes extends React.Component {
  
  render() {
    if (!this.props.href) { return null; };
    
    return (
      <a href={this.props.href} className="btn btn-primary btn-block">Yes</a>
    )
  }
}

export default ButtonYes;

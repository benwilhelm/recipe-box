import React from 'react'

class ButtonNo extends React.Component {
  
  render() {
    
    return (
      <a href='#' className="btn btn-primary btn-block" onClick={this.props.onClick}>No</a>
    )
  }
}

export default ButtonNo;

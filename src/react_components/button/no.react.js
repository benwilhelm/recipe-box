import React from 'react'

class ButtonNo extends React.Component {
  
  render() {
    
    return (
      <a href='#' className="btn btn-primary btn-block button-no" onClick={this.props.onClick}>No</a>
    )
  }
}

export default ButtonNo;

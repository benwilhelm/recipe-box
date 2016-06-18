import React from 'react'

class ButtonNo extends React.Component {
  
  render() {
    
    return (
      <a className="btn btn-primary btn-block button-no wtf" onClick={this.props.onClick}>No</a>
    )
  }
}

export default ButtonNo;

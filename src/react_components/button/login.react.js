import React from "react";

class ButtonLogin extends React.Component {
  
  render() {
  
    var classes = [
      "btn",
      "btn-block",
      "btn-primary"
    ]
    
    if (this.props.disabled) {
      classes.push("disabled")
    }
  
    return (
      <a className={classes.join(" ")}
         onClick={this.props.handleClick}>
          
        {this.props.loginText}
      </a>
     )
   }
}

export default ButtonLogin

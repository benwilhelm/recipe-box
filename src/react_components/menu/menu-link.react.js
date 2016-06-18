import React from "react";
import { Link }  from "react-router";


class MenuLink extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    var sheet = this.props.sheet;
    var linkTo = `/sheets/${sheet.sheetId}`;
    return (
      <li><Link to={linkTo} activeClassName="active" >{sheet.title}</Link></li>
    )
  }
}

export default MenuLink

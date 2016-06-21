import React from "react";
import MenuLink from "./menu/menu-link.react.js";

class Menu extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    
    if (!this.props.sheets) {
      return null
    }
    
    var linkComponents = this.props.sheets.map(sheet => {
      return <MenuLink key={sheet.sheetId} sheet={sheet} />
    })
    
    return (
      <nav className='sheet-list'>
        <ul className='list-inline' >{linkComponents}</ul>
      </nav>
    )
  }
}

export default Menu

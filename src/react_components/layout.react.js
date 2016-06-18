import React           from "react"
import GetGoogleClient from "google-client-api";

import Menu         from "./menu.react.js";
import ButtonLogin  from "./button/login.react.js";
import RecipeGroup  from "./recipe-group.react.js";

const CLIENT_ID = '114324736421-607629t9di2ogf2t6p1lk7cpct1h29s2.apps.googleusercontent.com';
const SCOPES = ['https://spreadsheets.google.com/feeds'];
const FILE_ID = '192OJ4F_1N-MGwPgj-5wHf6aEtos7mIg6gx-wNIRMwsM';


class Layout extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleAuthResult = this.handleAuthResult.bind(this);
    this.loadSheetsApi = this.loadSheetsApi.bind(this);
    this.getWorksheet = this.getWorksheet.bind(this);
    this.storeRows = this.storeRows.bind(this);
    this.nextRecipe = this.nextRecipe.bind(this);
    this.state = {
      loggedIn: false,
      gapi: false,
      sheets: []
    }
  }
  
  handleLoginClick() {
    var gapi = this.state.gapi;
    var handleAuthResult = this.handleAuthResult
    
    gapi.auth.authorize({
      client_id: CLIENT_ID, 
      scope: SCOPES, 
      immediate: false
    }, handleAuthResult);
  }
  
  handleAuthResult(authResult) {
        
    if (authResult && !authResult.error) {
      this.setState({ 
        loggedIn: authResult.status.signed_in,
        accessToken: authResult.access_token
      })
      this.loadSheetsApi();
    } else {
      console.log(authResult.error)
    }
  }
  
  loadSheetsApi() {
    var gapi = this.state.gapi;
    var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    var getWorksheet = this.getWorksheet
    gapi.client.load(discoveryUrl).then(getWorksheet);
  }
  
  getWorksheet() {
    var gapi = this.state.gapi;
    var self = this;
    
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId: FILE_ID
    }).then(res => {
      var sheets = res.result.sheets.map(s => s.properties)
      this.setState({sheets: sheets});
    })
    
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: FILE_ID,
      range: 'Jen and Ben!B2:C',
    }).then(function(response) {
      var range = response.result;
      self.storeRows(range.values);
      self.nextRecipe();
    }, function(response) {
      alert('Error: ' + response.result.error.message);
    });
  }
  
  storeRows(rawRows) {
    var recipes = rawRows.map(r => ({
      title : r[0],
      href  : r[1]
    }))
    this.setState({ recipes: recipes })
  }

  nextRecipe() {
    var recipes = this.state.recipes
    var idx = Math.floor(Math.random() * recipes.length)
    this.setState({ selectedRecipe: recipes[idx] })
  }
  
  componentDidMount() {
    GetGoogleClient((gapi) => {
      this.setState({gapi: gapi})
    })
  }
  
  render() {
    if (!this.state.loggedIn) {
      
      var disabled = false;
      var loginText = "Log in with Google";
      
      if (!this.state.gapi) {
        disabled = true;
        loginText = "Waiting for Google API";
      }
      
      return (
        <ButtonLogin 
         loginText={loginText}
         handleClick={this.handleLoginClick}
         disabled={disabled}
         />
      )
    }
    
    if (!this.state.recipes || !this.state.selectedRecipe) {
      return <h1>Syncing with spreadsheet...</h1>
    }
    
    return (
      <div>
        <Menu sheets={this.state.sheets} />
        {this.props.children && React.cloneElement(this.props.children, {
          selectedRecipe: this.state.selectedRecipe,
          onNextRecipe: this.nextRecipe
        })}
      </div>
    )
  }
}

export default Layout;

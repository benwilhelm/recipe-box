import React              from "react";
import ReactDOM           from "react-dom";
import GetGoogleClient    from "google-client-api";

import Recipe       from "./react_components/recipe.react.js";
import ButtonLogin  from "./react_components/button/login.react.js";
import ButtonNo     from "./react_components/button/no.react.js";

const CLIENT_ID = '114324736421-607629t9di2ogf2t6p1lk7cpct1h29s2.apps.googleusercontent.com';
const SCOPES = ['https://spreadsheets.google.com/feeds'];
const FILE_ID = '192OJ4F_1N-MGwPgj-5wHf6aEtos7mIg6gx-wNIRMwsM';


class RecipeBox extends React.Component {
  
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
      gapi: false
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
      var gapi = this.state.gapi
      localStorage.setItem("accessToken", JSON.stringify(gapi.auth.getToken()))
      
      this.setState({ 
        loggedIn: authResult.status.signed_in
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
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: FILE_ID,
      range: 'Jen and Ben!B2:C',
    }).then(function(response) {
      var range = response.result;
      self.storeRows(range.values);
      self.nextRecipe();
    }, function(response) {
      alert('Error: ' + response.result.error.message);
      self.setState({ loggedIn: false })
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
      if (localStorage.accessToken) {
        var token = JSON.parse(localStorage.accessToken)
        gapi.auth.setToken(token);
        this.setState({
          loggedIn: true,
          gapi: gapi
        })
        return this.loadSheetsApi();
      }
      
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
        <h1 id="app_title">What's For Dinner?</h1>  
        <hr />
        <Recipe recipe={this.state.selectedRecipe} />
        
        <div id="no_container">
          <div className="inner">
            <ButtonNo onClick={this.nextRecipe} />
          </div>
        </div>
      </div>
    )
  }
  
}

ReactDOM.render(<RecipeBox />, document.getElementById("react_app"))

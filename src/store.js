import { createStore, combineReducers } from "redux";
import _ from "lodash";

const recipeHandlers = {
  GOT_RANGES: function(state, action) {
    var ranges = action.ranges.map(r => r.values);
    var sheets = action.sheets.map(s => s.properties);;
    sheets = sheets.map((s, idx) => {
      s.recipes = ranges[idx].map(r => ({
        title: r[0],
        href : r[1]
      }))
      return s;
    })

    return Object.assign({}, state, { sheets: sheets })
  },

  SET_ACTIVE_SHEET: function(state, action) {
    var sheetId = action.sheetId;
    var sheet = _.find(state.sheets, s => { 
      return s.sheetId === +sheetId 
    });
    
    if (!sheet) {
      return state;
    }
    
    var newState = Object.assign({}, state, { activeSheet: sheet })
    return recipeHandlers.NEXT_RECIPE(newState)
  },
  
  NEXT_RECIPE: function(state, action) {
    var sheet = state.activeSheet;
    if (!sheet){
      return state;
    }
    
    var idx = Math.floor(Math.random() * sheet.recipes.length)
    var selectedRecipe = sheet.recipes[idx];
    return Object.assign({}, state, { selectedRecipe: selectedRecipe })
  }
}



function createReducer(handlerObject) {
  return function(state={}, action) {
    var handler = handlerObject[action.type] || false;
    if (handler) {
      return handler(state, action)
    }
    return state;
  }
}

const reducers = combineReducers({
  recipes : createReducer(recipeHandlers),
  // sheetState  : createReducer(sheetHandlers)
});

const store = createStore(reducers);
export default store;

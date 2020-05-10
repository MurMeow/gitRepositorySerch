import {Action, ActionReducerMap, createReducer, on} from '@ngrx/store';
import {
  fetchInfoFromGithub,
  getRequestName,
  getResponseToRequestGithubSuccess,
  openPersonalCard,
  closePersonalCard, getResponseToRequestGithubError
} from './store.actions';
import {routerReducer} from "@ngrx/router-store";


export interface State {
  // searchResults: {
    searchWord: string,
    error: object | null,
    isLoading: boolean,
    data: object | null,
    selectedCard: {
      id: null,
      name: null,
      login: null,
      avatar_url: null,
      html_url: null,
      type: null,
      created_at: null,
      updated_at: null
    } | null
  // }
}


export const initialState: State = {
  // searchResults: {
    searchWord: '',
    error: null,
    isLoading: false,
    data: null,
    selectedCard: null
  // }
}

const storeReducer = createReducer(initialState,
  on(getRequestName, (state, {searchWord}) => ({ ...state, searchWord: searchWord }) ),
  // on(fetchInfoFromGithub, state => ({ ...state, isLoading: true }) ),
  // on(fetchInfoFromGithub, state => ({ ...state, { ...state.searchResult } }) ),
  // on(getResponseToRequestGithubSuccess, (state) => ({ ...state, isLoading: false, data: {} }) ),
  on(getResponseToRequestGithubSuccess, (state, {data}) => ({ ...state, isLoading: false, data: data }) ),
  on(getResponseToRequestGithubError, (state, {error}) => ({ ...state, isLoading: false, error: error }) ),
  on(openPersonalCard, (state, {selectedCard}) => ({ ...state, selectedCard: selectedCard }) ),
  on(closePersonalCard, state=> ({ ...state, selectedCard: null }) )
);




// export function reducer(state: State | undefined, action: Action) {
//   return storeReducer(state, action);
// }


export const appReducers = {
  router: routerReducer,
  searchResults: storeReducer
};

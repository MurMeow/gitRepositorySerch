import {
  Action,
  ActionReducer,
  ActionReducerMap, combineReducers,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store'
import { environment } from '../../environments/environment'
import {
  clearState,
  closePersonalCard,
  getRequestName,
  getResponseToRequestGithubError,
  getResponseToRequestGithubSuccess, openPersonalCard, setActivePreloader
} from "../store/store.actions"

export const dataNode= 'data'
export const cardNode= 'selectedCard'
export const searchWordNode= 'searchWord'
export const isLoadingNode= 'isLoading'
export const errorNode= 'error'
export const searchResults= 'searchResults'

export interface IAppState {
  [searchResults]: State
}

export interface State {
  [searchWordNode]: string,
  [isLoadingNode]: boolean,
  [errorNode]: ErrorState | null,
  [dataNode]: DataState | null,
  [cardNode]: CardState | null
}

export interface ErrorState {
    status: string,
    statusText: string,
    message: string,
}

export interface DataState {
  data: InfoDataState | null
}

export interface InfoDataState {
  total_count: number,
  incomplete_results: boolean,
  items: any
}

export interface CardState {
  id: number | null,
  name: string | null,
  login: string | null,
  avatar_url: string | null,
  html_url: string | null,
  created_at: any | null,
  updated_at: any | null
}

export const initialState: State = {
  searchWord: '',
  error: null,
  isLoading: false,
  data: {
    // @ts-ignore
    total_count: 0,
    incomplete_results: false,
    items: []
  },
  selectedCard: null
}

const storeReducer = createReducer(initialState,
  on(getRequestName, (state, {searchWord}) => ({ ...state, [searchWordNode]: searchWord }) ),
  on(setActivePreloader, state=> ({ ...state, [isLoadingNode]: true }) ),
  on(getResponseToRequestGithubSuccess, (state, {data}) => ({ ...state, [isLoadingNode]: false, [dataNode]: data }) ),
  on(getResponseToRequestGithubError, (state, {error}) => ({ ...state, [isLoadingNode]: false, [errorNode]: error, [dataNode]: { total_count: 0, incomplete_results: false, items: []} }) ),
  on(openPersonalCard, (state, {selectedCard}) => ({ ...state, [cardNode]: selectedCard }) ),
  on(closePersonalCard, state=> ({ ...state, [cardNode]: null }) ),
  on(clearState, state=> ({ ...state, [dataNode]: { total_count: 0, incomplete_results: false, items: []}, [errorNode]: null, searchWord: '' }) )
)

export const reducers: ActionReducerMap<IAppState> = {
  // @ts-ignore
  [searchResults]: storeReducer
}

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : []


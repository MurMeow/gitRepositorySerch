import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ErrorState, IAppState, searchResults, State } from "../redusers"

export const selectFeatureAppState = createFeatureSelector<IAppState>(searchResults)

export const  selectData = createSelector(
  // @ts-ignore
  selectFeatureAppState,
  (state:State): object => state.data
)

export const  selectSearchWord = createSelector(
  // @ts-ignore
  selectFeatureAppState,
  (state:State): string => state.searchWord
)

export const  selectCard = createSelector(
  // @ts-ignore
  selectFeatureAppState,
  (state:State): object | null => state.selectedCard
)

export const  selectIsLoading = createSelector(
  // @ts-ignore
  selectFeatureAppState,
  (state:State): boolean => state.isLoading
)

export const  selectError = createSelector(
  // @ts-ignore
  selectFeatureAppState,
  (state:State): ErrorState | null => state.error
)


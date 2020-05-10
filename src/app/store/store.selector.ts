import { createSelector } from '@ngrx/store';

export interface FeatureStateIsLoading {
  isLoading: boolean;
}

export interface AppStateIsLoading {
  isLoading: FeatureStateIsLoading;
}

export const selectIsLoading = (state: AppStateIsLoading) => state.isLoading;

export const selectStateIsLoading = createSelector(
  selectIsLoading,
  (state: FeatureStateIsLoading) => state.isLoading
);




export interface FeatureStateData {
  data: object | null;
}

export interface AppStateData {
  data: FeatureStateData;
}

export const selectData = (state: AppStateData) => state.data;

export const selectStateData = createSelector(
  selectData,
  (state: FeatureStateData) => state.data
);


export const selectSearchWord = (state) => state.searchWord;

export const selectStateSearchWord = createSelector(
  selectSearchWord,
  (state) => state.searchWord
);


export interface FeatureStateData {
  data: object | null;
}

export const selectFeature = (state: FeatureStateData) => state.data;

export const selectFeatureData = createSelector(
  selectFeature,
  (state: FeatureStateData) => state.data
);


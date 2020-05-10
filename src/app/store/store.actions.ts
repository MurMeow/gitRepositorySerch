// @ts-ignore
import { createAction, props } from '@ngrx/store';


export const getRequestName = createAction(  '[Input Component] getRequestName', props<{ searchWord }>());
export const fetchInfoFromGithub = createAction(  '[Input Component] fetchInfoFromGithub', props<{ searchWord }>());
export const getResponseToRequestGithubSuccess = createAction(  '[Input Component] getResponseToRequestGithubSuccess', props<{ data }>());
export const getResponseToRequestGithubError = createAction(  '[Input Component] getResponseToRequestGithubError', props<{ error }>());
export const openPersonalCard = createAction(  '[Table Component] openPersonalCard', props<{ selectedCard }>());
export const closePersonalCard = createAction(  '[Table Component] closePersonalCard');

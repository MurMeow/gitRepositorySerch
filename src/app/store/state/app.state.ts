import { RouterReducerState } from '@ngrx/router-store';

import { IConfigState, initialConfigState } from "./config.state";
import { IInfoState, initialInfoState} from "./info.state";


export interface IAppState {
  router?: RouterReducerState,
  info: IInfoState,
  config: IConfigState,
}

export const initialAppState: IAppState = {
  info: initialInfoState,
  config: initialConfigState
}

export function getInitialState(): IAppState {
  return initialAppState
}

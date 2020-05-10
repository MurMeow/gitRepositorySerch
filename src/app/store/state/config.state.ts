import { IConfig } from '../../../../rubbish/interfaces/config.interface';


export interface IConfigState {
  config: IConfig,
  selectedConfig: IConfig
}

// @ts-ignore
export const initialConfigState: IConfigState = {
  config: {
    isLoadedCard: false,
    isLoadedTable: false
  },
  selectedConfig: null
}


import { IInfo } from '../../../../rubbish/interfaces/info.interface';


export interface IInfoState {
  info: IInfo,
  selectedInfo: IInfo
}

export const initialInfoState: IInfoState = {
  info: {
    searchStr: "",
    data: {},
    person: {
      id: null,
      name: null,
      login: null,
      avatar_url: null,
      html_url: null,
      type: null,
      created_at: null,
      updated_at: null
    }
  },
  selectedInfo: null
}

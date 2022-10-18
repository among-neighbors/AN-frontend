import { combineReducers, createStore } from 'redux';
import { Obj } from './integrateInterface';

const ACTION_FROM_NOTICE = 'actionToNotice',
  ACTION_FROM_COMMUNITY = 'actionToCommunity';

const ACTION_TO_HANDLE_HELP_SIDE_BAR = 'actionToHandleHelpSideBar',
  ACTION_TO_CLOSE_HELP_SIDE_BAR = 'actionToCloseHelpSideBar',
  ACTION_TO_OPEN_HELP_SIDE_BAR = 'actionToOpenHelpSideBar';

const ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN = 'actionToRefreshAccountAccessToken',
  ACTION_TO_REFRESH_PROFILE_ACCESS_TOKEN = 'actionToRefreshProfileAccessToken';

const ACTION_TO_GET_READY_FOR_REQUEST_API = 'actionToGetReadyForRequestAPI';

const ACTION_TO_PUT_PROFILE = 'actionToPutProfile';

const ACTION_TO_UPDATE_HELP_CALL = 'actionToUpdateHelpCall';
const ACTION_TO_CLOSE_HELP_CALL_BOX = 'actionToCloseHelpCallBox';

interface TableNavState extends Obj<number> {
  notice: number;
  community: number;
}

interface accessTokenState {
  accountAccessToken: string;
  profileAccessToken: string;
}

interface RootState {
  helpSideBarReducer: boolean;
  tableNavReducer: TableNavState;
  accessTokenReducer: accessTokenState;
  readyForRequestAPIReducer: boolean;
  profileReducer: ProfileState;
  helpCallReducer: HelpCallState;
}

interface ProfileState {
  id: number;
  name: string;
  lineName: string;
  houseName: string;
  imgUrl: string;
}

interface HelpCallState {
  requests: { targetHouse: string }[];
  accepts: { targetHouse: string; acceptHouse: string }[];
}

const helpCallReducer = (
  state: HelpCallState = {
    requests: [],
    accepts: [],
  },
  action: {
    type: string;
    acceptHouse: string;
    targetHouse: string;
  },
) => {
  const tempState = { ...state };
  const { type, acceptHouse, targetHouse } = action;
  switch (type) {
    case ACTION_TO_UPDATE_HELP_CALL:
      if (acceptHouse) {
        tempState.requests = state.requests.filter(
          (request) => request.targetHouse !== targetHouse,
        );
        tempState.accepts.push({
          acceptHouse,
          targetHouse,
        });
      } else {
        tempState.requests = state.requests.filter(
          (request) => request.targetHouse !== targetHouse,
        );
        tempState.requests.push({
          targetHouse,
        });
      }
      return tempState;
    case ACTION_TO_CLOSE_HELP_CALL_BOX:
      tempState.requests = state.requests.filter(
        (request) => request.targetHouse !== action.targetHouse,
      );
      return tempState;
    default:
      return state;
  }
};

const profileReducer = (
  state: ProfileState = {
    id: -1,
    name: '',
    lineName: '',
    houseName: '',
    imgUrl: '',
  },
  action: {
    type: string;
    profileData: ProfileState;
  },
) => {
  switch (action.type) {
    case ACTION_TO_PUT_PROFILE:
      return { ...action.profileData };
    default:
      return state;
  }
};

const tableNavReducer = (
  state: TableNavState = {
    notice: 0,
    community: 0,
  },
  action: {
    type: string;
    idx: number;
  },
) => {
  switch (action.type) {
    case ACTION_FROM_COMMUNITY:
      return {
        notice: state.notice,
        community: action.idx,
      };
    case ACTION_FROM_NOTICE:
      return {
        notice: action.idx,
        community: state.community,
      };
    default:
      return state;
  }
};

const helpSideBarReducer = (state = false, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TO_HANDLE_HELP_SIDE_BAR:
      return !state;
    case ACTION_TO_CLOSE_HELP_SIDE_BAR:
      return false;
    case ACTION_TO_OPEN_HELP_SIDE_BAR:
      return true;
    default:
      return state;
  }
};

const accessTokenReducer = (
  state = {
    accountAccessToken: '123',
    profileAccessToken: '123',
  },
  action: { type: string; accessToken: string },
) => {
  switch (action.type) {
    case ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN:
      return {
        accountAccessToken: action.accessToken,
        profileAccessToken: state.profileAccessToken,
      };
    case ACTION_TO_REFRESH_PROFILE_ACCESS_TOKEN:
      return {
        accountAccessToken: state.accountAccessToken,
        profileAccessToken: action.accessToken,
      };
    default:
      return state;
  }
};

const readyForRequestAPIReducer = (state = false, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TO_GET_READY_FOR_REQUEST_API:
      return true;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tableNavReducer,
  helpSideBarReducer,
  accessTokenReducer,
  readyForRequestAPIReducer,
  profileReducer,
  helpCallReducer,
});

const store = createStore(rootReducer);

const closeHelpCallBox = (targetHouse: string) => {
  store.dispatch({
    type: ACTION_TO_CLOSE_HELP_CALL_BOX,
    targetHouse,
  });
};

const handleTableNav = (isNotice: boolean, idx: number) => {
  store.dispatch({
    type: isNotice ? ACTION_FROM_NOTICE : ACTION_FROM_COMMUNITY,
    idx,
  });
};

const handleHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_HANDLE_HELP_SIDE_BAR,
  });
};

const openHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_OPEN_HELP_SIDE_BAR,
  });
};

const closeHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_CLOSE_HELP_SIDE_BAR,
  });
};

const handleRefreshAccountAccessToken = (accessToken: string) => {
  store.dispatch({
    type: ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN,
    accessToken,
  });
};

const handleRefreshProfileAccessToken = (accessToken: string) => {
  store.dispatch({
    type: ACTION_TO_REFRESH_PROFILE_ACCESS_TOKEN,
    accessToken,
  });
};

const getReadyForRequestAPI = () => {
  store.dispatch({
    type: ACTION_TO_GET_READY_FOR_REQUEST_API,
  });
};

const handlePutProfile = (profileData: ProfileState) => {
  store.dispatch({
    type: ACTION_TO_PUT_PROFILE,
    profileData,
  });
};

const updateHelpCallData = (targetHouse: string, acceptHouse?: string) => {
  store.dispatch({
    type: ACTION_TO_UPDATE_HELP_CALL,
    targetHouse,
    acceptHouse,
  });
};

export {
  store,
  TableNavState,
  handleTableNav,
  handleHelpSideBar,
  closeHelpSideBar,
  openHelpSideBar,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  getReadyForRequestAPI,
  handlePutProfile,
  helpCallReducer,
  updateHelpCallData,
  closeHelpCallBox,
  HelpCallState,
  RootState,
  accessTokenState,
  ProfileState,
};

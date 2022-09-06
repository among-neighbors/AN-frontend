import { combineReducers, createStore } from 'redux';
import { Obj } from './integrateInterface';

const ACTION_FROM_NOTICE = 'actionToNotice',
  ACTION_FROM_COMMUNITY = 'actionToCommunity';

const ACTION_TO_HANDLE_HELP_SIDE_BAR = 'actionToHandleHelpSideBar',
  ACTION_TO_CLOSE_HELP_SIDE_BAR = 'actionToCloseHelpSideBar';

const ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN = 'actionToRefreshAccountAccessToken',
  ACTION_TO_REFRESH_PROFILE_ACCESS_TOKEN = 'actionToRefreshProfileAccessToken';

const ACTION_TO_GET_READY_FOR_REQUEST_API = 'actionToGetReadyForRequestAPI';

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
}

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
    default:
      return state;
  }
};

const accessTokenReducer = (
  state = {
    accountAccessToken: '',
    profileAccessToken: '',
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
});

const store = createStore(rootReducer);

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

export {
  store,
  TableNavState,
  handleTableNav,
  handleHelpSideBar,
  closeHelpSideBar,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  getReadyForRequestAPI,
  RootState,
  accessTokenState,
};

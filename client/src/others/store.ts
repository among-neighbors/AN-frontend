import { combineReducers, createStore } from 'redux';

const ACTION_FROM_NOTICE = 'actionToNotice';
const ACTION_FROM_COMMUNITY = 'actionToCommunity';

const ACTION_TO_CLOSE_HELP_SIDE_BAR = 'actionToCloseHelpSideBar';
const ACTION_TO_OPEN_HELP_SIDE_BAR = 'actionToOpenHelpSideBar';

interface TableNavState {
  notice: number;
  community: number;
}

const tableNavReducer = (
  state: TableNavState = {
    notice: 0,
    community: 0,
  },
  action: any,
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

const helpSideBarReducer = (state: boolean = false, action: any) => {
  switch (action.type) {
    case ACTION_TO_OPEN_HELP_SIDE_BAR:
      return true;
    case ACTION_TO_CLOSE_HELP_SIDE_BAR:
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tableNavReducer,
  helpSideBarReducer,
});

const store = createStore(rootReducer);

const handleTableNav = (isNotice: boolean, idx: number) => {
  store.dispatch({
    type: isNotice ? ACTION_FROM_NOTICE : ACTION_FROM_COMMUNITY,
    idx,
  });
};

const closeHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_CLOSE_HELP_SIDE_BAR,
  });
};

const openHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_OPEN_HELP_SIDE_BAR,
  });
};

export { store, handleTableNav };

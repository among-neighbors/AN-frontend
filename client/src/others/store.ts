import { createStore } from 'redux';

const ACTION_FROM_NOTICE = 'actionToNotice';
const ACTION_FROM_COMMUNITY = 'actionToCommunity';

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

const tableNavStore = createStore(tableNavReducer);

const handleTableNav = (isNotice: boolean, idx: number) => {
  tableNavStore.dispatch({
    type: isNotice ? ACTION_FROM_NOTICE : ACTION_FROM_COMMUNITY,
    idx,
  });
};

export { tableNavStore, handleTableNav };

// const SUCCESS_TO_SIGN_IN = 'succesToSignIn';
// const FAIL_TO_SIGN_IN = 'failToSignIn';

// const reducer = (state: boolean = false, action: any) => {
//   switch (action.type) {
//     case SUCCESS_TO_SIGN_IN:
//       return true;
//     case FAIL_TO_SIGN_IN:
//       return false;
//     default:
//       return state;
//   }
// };

// const signInStore = createStore(reducer);

// export const weAreSignIn = () => {
//   signInStore.dispatch({
//     type: SUCCESS_TO_SIGN_IN,
//   });
// };

// export default signInStore;

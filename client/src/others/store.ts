import { createStore } from 'redux';

const SUCCESS_TO_SIGN_IN = 'succesToSignIn';
const FAIL_TO_SIGN_IN = 'failToSignIn';

const reducer = (state: boolean = false, action: any) => {
  switch (action.type) {
    case SUCCESS_TO_SIGN_IN:
      return true;
    case FAIL_TO_SIGN_IN:
      return false;
    default:
      return state;
  }
};

const signInStore = createStore(reducer);

export const weAreSignIn = () => {
  signInStore.dispatch({
    type: SUCCESS_TO_SIGN_IN,
  });
};

export default signInStore;

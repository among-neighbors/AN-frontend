import { useEffect } from 'react';
import { connect } from 'react-redux';
import { weAreSignIn } from '~/others/store';

const NoticePage = (props: any) => {
  useEffect(() => {
    weAreSignIn();

    console.log('notice', props);
  }, []);
  return <></>;
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(NoticePage);

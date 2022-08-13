import { useEffect } from 'react';
import { connect } from 'react-redux';

const HomePage = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <></>;
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(HomePage);

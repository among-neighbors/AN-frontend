import { useEffect } from 'react';
import { connect } from 'react-redux';
import TableRowForMobile from '../components/molecules/TableRow';

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

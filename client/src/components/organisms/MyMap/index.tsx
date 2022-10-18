import { Button } from '@mui/material';
import { Map } from 'react-kakao-maps-sdk';
import { connect } from 'react-redux';
import SquareImg from '~/components/atoms/Img';
import { closeMap, MapState, RootState } from '~/others/store';
import { ReactComponent as MainIcon } from '../../../../public/img/mainIcon.svg';
import { StyledMap } from './styled';

interface Props {
  mapState: MapState;
}

const MyMap: React.FC<Props> = (props) => {
  const { mapState } = props;
  const { isOpen, pos } = mapState;
  return (
    <>
      {isOpen && (
        <StyledMap>
          <div className={'header'}>
            <div className={'back'} onClick={closeMap}>
              <SquareImg src={'../../../../public/img/back.png'} />
            </div>
            <div className={'icon'}>
              <MainIcon />
            </div>
            <div>
              <Button variant={'contained'} color={'success'}>
                수락
              </Button>
            </div>
          </div>
          {pos && (
            <Map
              center={pos}
              style={{
                width: '100%',
                height: '100%',
              }}
            ></Map>
          )}
        </StyledMap>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mapState: state.mapReducer,
  };
};

export default connect(mapStateToProps)(MyMap);

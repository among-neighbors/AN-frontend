import { Button } from '@mui/material';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { connect } from 'react-redux';
import SquareImg from '~/components/atoms/Img';
import { closeMap, MapState, RootState } from '~/others/store';
import { ReactComponent as MainIcon } from '../../../../public/img/mainIcon.svg';
import { ReactComponent as Plus } from '../../../../public/img/plus.svg';
import { ReactComponent as Minus } from '../../../../public/img/minus.svg';
import { StyledMap } from './styled';
import { useRef } from 'react';

interface Props {
  mapState: MapState;
}

const MyMap: React.FC<Props> = (props) => {
  const { mapState } = props;
  const { isOpen, pos } = mapState;
  const mapRef = useRef<kakao.maps.Map>(null);

  const levelUp = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel - 1);
  };

  const levelDown = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel + 1);
  };

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
              ref={mapRef}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <MapMarker position={pos} />
            </Map>
          )}
          <div className={'services'}>
            <button onClick={levelUp}>
              <Plus />
            </button>
            <button onClick={levelDown}>
              <Minus />
            </button>
          </div>
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

import { useEffect } from 'react';
import { accessTokenState, Pos, ProfileState, RootState, updateHelpCallData } from '~/others/store';
import { Stomp } from '@stomp/stompjs';
import { connect } from 'react-redux';

interface HelpCallConnectSocket {
  accountToken: accessTokenState;
  profileData: ProfileState;
}

const BROKER_URL = 'wss://neighbor42.com:8181/an-ws';
export const client = Stomp.client(BROKER_URL);
client.debug = () => {};

const HelpCallConnectSocket: React.FC<HelpCallConnectSocket> = ({ accountToken, profileData }) => {
  const { accountAccessToken } = accountToken;
  const { lineName } = profileData;

  const handleRequest = (targetHouse: string, pos: Pos) => {
    updateHelpCallData(targetHouse, pos);
  };

  const handleAccept = (targetHouse: string, acceptHouse: string, pos: Pos) => {
    updateHelpCallData(targetHouse, pos, acceptHouse);
  };

  useEffect(() => {
    if (lineName === '') return;
    client.connect({ Authorization: accountAccessToken }, () => {
      client.subscribe('/user/queue/error', () => {});

      client.subscribe(`/sub/line/${profileData.lineName}`, (message) => {
        const { target_house, accept_house, house, lat, lng } = JSON.parse(message.body);
        if (house) {
          handleRequest(house, {
            lat,
            lng,
          });
        }

        if (target_house) {
          handleAccept(target_house, accept_house, {
            lat,
            lng,
          });
        }
      });
    });
  }, [lineName]);

  return <></>;
};

const mapStateToProps = (state: RootState) => {
  return {
    accountToken: state.accessTokenReducer,
    profileData: state.profileReducer,
    helpCallData: state.helpCallReducer,
  };
};

export default connect(mapStateToProps)(HelpCallConnectSocket);

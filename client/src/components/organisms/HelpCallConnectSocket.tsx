import { useEffect } from 'react';
import { accessTokenState, ProfileState, RootState, updateHelpCallData } from '~/others/store';
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

  const handleRequest = (targetHouse: string) => {
    updateHelpCallData(targetHouse);
  };

  const handleAccept = (targetHouse: string, acceptHouse: string) => {
    updateHelpCallData(targetHouse, acceptHouse);
  };

  useEffect(() => {
    if (lineName === '') return;
    client.connect({ Authorization: accountAccessToken }, () => {
      client.subscribe('/user/queue/error', () => {});

      client.subscribe(`/sub/line/${profileData.lineName}`, (message) => {
        if (JSON.parse(message.body).house) {
          handleRequest(JSON.parse(message.body).house);
        }

        if (JSON.parse(message.body).target_house) {
          const { target_house, accept_house } = JSON.parse(message.body);
          handleAccept(target_house, accept_house);
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

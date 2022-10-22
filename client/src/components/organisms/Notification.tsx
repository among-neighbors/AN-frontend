import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { NotificationState, RootState } from '~/others/store';

interface Props {
  notificationData: NotificationState;
}

const Notification: React.FC<Props> = (props) => {
  const { message, index } = props.notificationData;
  if (message === '') return <></>;

  return <StyledNotification key={index}>{message}</StyledNotification>;
};

const appear = keyframes`
    0% {
        transform: translateY(60px);
    }
    20% {
        transform: translateY(0);
    }
    80% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(60px);
    }
`;

const StyledNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #ec8034;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  animation: ${appear} 2s forwards;
  z-index: 1102;
`;

const mapStateToProps = (state: RootState) => {
  return {
    notificationData: state.notificationReducer,
  };
};

export default connect(mapStateToProps)(Notification);

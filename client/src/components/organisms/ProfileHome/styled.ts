import { Button } from '@mui/material';
import styled from 'styled-components';
import { shadowCSSForStyledComponent } from '~/others/cssLibrary';
import { ColorsByProfileIndex } from '~/others/integrateVariable';

const ProfileHomeButton = styled.button`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 60px;
  height: 60px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

interface ProfileHomeContainerProps {
  test: number;
}

const ProfileHomeContainer = styled.div<ProfileHomeContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1101;
  opacity: ${(props) => (props.test ? '1' : '0')};
  transition: 1s;
`;

const SelectedProfileContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const ProfileListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 40px;
  padding: 40px;
`;

const ProfileLoginButton = styled(Button)``;

interface ProfileProps {
  index?: number;
}

const Profile = styled.div<ProfileProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background: #fff;
  font-size: 30px;
  padding: 30px;
  color: #fff;
  background: ${(props) => ColorsByProfileIndex[props.index ?? 0]};
  cursor: pointer;
  text-align: center;
  ${shadowCSSForStyledComponent}
  &:hover {
    transform: translate(4px, -4px);
  }
  transition: 0.3s;
`;

const NewProfileButton = styled(Profile)``;

const SelectedProfile = styled(Profile)`
  width: 250px;
  height: 250px;
  font-size: 50px;
  padding: 50px;
  &:hover {
    transform: none;
  }
  cursor: inherit;
`;

export {
  ProfileHomeButton,
  ProfileHomeContainer,
  SelectedProfileContainer,
  ProfileListContainer,
  ProfileLoginButton,
  Profile,
  NewProfileButton,
  SelectedProfile,
};

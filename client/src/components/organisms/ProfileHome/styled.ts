import { Button } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';
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
  @media (max-width: 1023px) {
    top: 10px;
    left: 5px;
  }
`;

interface ProfileHomeContainerProps {
  opacity: number;
}

const myOpacity = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

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
  transition: 1s;
  ${(props) =>
    Boolean(props.opacity) &&
    css`
      animation: ${myOpacity} 1s forwards;
    `}
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
  @media (max-width: 500px) {
    gap: 10px;
    padding: 20px;
  }
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
  overflow: hidden;
  color: #fff;
  background: ${(props) => ColorsByProfileIndex[props.index ?? 0]};
  cursor: pointer;
  text-align: center;
  ${shadowCSSForStyledComponent}

  & .profileImg {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: #000;
    & > p {
      position: absolute;
      z-index: 1;
      color: #fff;
    }
  }

  &:hover {
    transform: translate(4px, -4px);
  }
  transition: 0.3s;
  @media (max-width: 500px) {
    width: calc(50% - 10px);
    height: 100px;
    font-size: 14px;
    white-space: nowrap;
  }
`;

const NewProfileButton = styled(Profile)``;

const SelectedProfile = styled(Profile)`
  width: 250px;
  height: 250px;
  font-size: 50px;
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

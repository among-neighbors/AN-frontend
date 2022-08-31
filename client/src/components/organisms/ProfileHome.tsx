import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shadowCSSForStyledComponent } from '~/others/cssLibrary';
import { handleRefreshProfileAccessToken } from '~/others/store';
import SquareImg from '../atoms/Img';
import NewProfileForm from './NewProfileForm';

interface ProfileHomeProps {
  token: string;
}

interface ProfileData {
  profileId: number;
  name: string;
}

const ProfileHome: React.FC<ProfileHomeProps> = ({ token }) => {
  const [profileList, setProfileList] = useState<ProfileData[]>([]);
  const [isProfileHome, setIsProfileHome] = useState(true);

  const handleOpenNewProfile = () => {
    setIsProfileHome(false);
  };

  const getProfileList = async (token: string) => {
    const res = await axios.get('https://neighbor42.com:8181/api/v1/accounts/profiles', {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    setProfileList(res.data.response.profiles);
  };

  useEffect(() => {
    if (!isProfileHome) return;
    try {
      getProfileList(token);
    } catch (err) {
      console.log(err);
    }
  }, [isProfileHome]);

  return (
    <ProfileHomeContainer>
      {isProfileHome ? (
        <Profiles
          profileList={profileList}
          handleOpenNewProfile={handleOpenNewProfile}
          token={token}
        />
      ) : (
        <NewProfileForm setIsProfileHome={setIsProfileHome} />
      )}
    </ProfileHomeContainer>
  );
};

interface ProfilesProps {
  profileList: ProfileData[];
  handleOpenNewProfile: () => void;
  token: string;
}

const Profiles: React.FC<ProfilesProps> = ({ profileList, handleOpenNewProfile, token }) => {
  const [isSelectedProfile, setIsSelectedProfile] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState<ProfileData>({
    profileId: 0,
    name: '',
  });

  const selectProfile = ({ profileId, name }: ProfileData) => {
    setIsSelectedProfile(true);
    setSelectedProfileData({
      profileId,
      name,
    });
  };

  const goToProfileHome = () => {
    setIsSelectedProfile(false);
    setSelectedProfileData({
      profileId: 0,
      name: '',
    });
  };

  const handleSubmitProfileLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await axios.post(
      'https://neighbor42.com:8181/api/v1/auth/profiles/login',
      {
        profileId: selectedProfileData.profileId,
        pin: data.get('pin'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    handleRefreshProfileAccessToken(res.data.response.accessToken);
  };

  return (
    <>
      {isSelectedProfile ? (
        <>
          <ProfileHomeButton onClick={goToProfileHome}>
            <SquareImg src='../../../public/img/back.png' length='60px' />
          </ProfileHomeButton>
          <SelectedProfileContainer onSubmit={handleSubmitProfileLogin}>
            <SelectedProfile>{selectedProfileData.name}</SelectedProfile>
            <TextField
              margin='normal'
              required
              id='pin'
              label='pin 번호 입력'
              name='pin'
              type='password'
              autoComplete='pin'
              autoFocus
              sx={{
                width: '250px',
                '& .MuiOutlinedInput-root:hover': {
                  '&:hover > fieldset': {
                    borderColor: '#EC8034',
                  },
                },
                '& > div, & > label': {
                  color: '#fff',
                },
                '& > div > fieldset': {
                  borderColor: '#fff',
                },
              }}
            />
            <ProfileLoginButton type='submit' variant='contained'>
              프로필 로그인
            </ProfileLoginButton>
          </SelectedProfileContainer>
        </>
      ) : (
        <ProfileListContainer>
          {profileList.map(({ profileId, name }, index) => {
            return (
              <Profile key={index} onClick={() => selectProfile({ profileId, name })}>
                {name}
              </Profile>
            );
          })}
          <NewProfileButton onClick={handleOpenNewProfile}>
            <SquareImg src='../../../public/img/plus.png' length='50px' />
          </NewProfileButton>
        </ProfileListContainer>
      )}
    </>
  );
};

export const ProfileHomeButton = styled.button`
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

const ProfileHomeContainer = styled.div`
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

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background: #fff;
  font-size: 30px;
  padding: 30px;
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

export default ProfileHome;

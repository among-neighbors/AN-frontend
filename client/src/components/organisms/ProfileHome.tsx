import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shadowCSSForStyledComponent } from '~/others/cssLibrary';
import { handleRefreshProfileAccessToken } from '~/others/store';
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
        <SelectedProfileContainer onSubmit={handleSubmitProfileLogin}>
          <SelectedProfile>{selectedProfileData.name}</SelectedProfile>
          <TextField
            margin='normal'
            required
            fullWidth
            id='pin'
            label='pin 번호 입력'
            name='pin'
            type='password'
            autoComplete='pin'
            autoFocus
          />
          <ProfileLoginButton type='submit'>프로필 로그인</ProfileLoginButton>
        </SelectedProfileContainer>
      ) : (
        <ProfileListContainer>
          {profileList.map(({ profileId, name }, index) => {
            return (
              <Profile key={index} onClick={() => selectProfile({ profileId, name })}>
                {name}
              </Profile>
            );
          })}
          <NewProfileButton onClick={handleOpenNewProfile}>신규 프로필 등록</NewProfileButton>
        </ProfileListContainer>
      )}
    </>
  );
};

const ProfileHomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1101;
`;

const SelectedProfileContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ProfileListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 40px;
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
  ${shadowCSSForStyledComponent}
`;

const NewProfileButton = styled(Profile)``;

const SelectedProfile = styled(Profile)`
  width: 250px;
  height: 250px;
  font-size: 50px;
`;

export default ProfileHome;

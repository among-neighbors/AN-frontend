import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ProfileHomeButton,
  ProfileHomeContainer,
  SelectedProfileContainer,
  ProfileListContainer,
  ProfileLoginButton,
  Profile,
  NewProfileButton,
  SelectedProfile,
} from './styled';
import { handleRefreshProfileAccessToken } from '~/others/store';
import SquareImg from '../../atoms/Img';
import NewProfileForm from '../NewProfileForm';

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
  const [test, setTest] = useState(false);

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

  useEffect(() => {
    console.log(test);
    setTest(true);
  }, [test]);

  return (
    <ProfileHomeContainer id='test' test={test ? 1 : 0}>
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

export default ProfileHome;

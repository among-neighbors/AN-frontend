import { TextField } from '@mui/material';
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
import myAxios from '~/others/myAxios';

interface ProfileHomeProps {
  accountAccessToken: string;
}

interface ProfileData {
  profileId: number;
  name: string;
}

const ProfileHome: React.FC<ProfileHomeProps> = ({ accountAccessToken }) => {
  const [profileList, setProfileList] = useState<ProfileData[]>([]);
  const [isProfileHome, setIsProfileHome] = useState(true);
  const [test, setTest] = useState(false);

  const handleOpenNewProfile = () => {
    setIsProfileHome(false);
  };

  const getProfileList = async () => {
    const res = await myAxios('get', 'api/v1/accounts/profiles', null, true, accountAccessToken);
    console.log(res, '프로필 목록');
    setProfileList(res.data.response.profiles);
  };

  useEffect(() => {
    if (!isProfileHome) return;
    try {
      getProfileList();
    } catch (err) {
      console.log(err);
    }
  }, [isProfileHome]);

  useEffect(() => {
    // console.log(test);
    setTest(true);
  }, [test]);

  return (
    <ProfileHomeContainer id='test' test={test ? 1 : 0}>
      {isProfileHome ? (
        <Profiles
          profileList={profileList}
          handleOpenNewProfile={handleOpenNewProfile}
          accountAccessToken={accountAccessToken}
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
  accountAccessToken: string;
}

const Profiles: React.FC<ProfilesProps> = ({
  profileList,
  handleOpenNewProfile,
  accountAccessToken,
}) => {
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
    const body = {
      profileId: selectedProfileData.profileId,
      pin: data.get('pin'),
    };
    const res = await myAxios('post', 'api/v1/auth/profiles/login', body, true, accountAccessToken);
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

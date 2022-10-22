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
import { handleRefreshProfileAccessToken, makeNotification } from '~/others/store';
import SquareImg from '../../atoms/Img';
import NewProfileForm from '../NewProfileForm';
import myAxios from '~/others/myAxios';
import { AxiosError } from 'axios';
import { CustomAxiosResponse } from '~/others/integrateInterface';

interface ProfileHomeProps {
  accountAccessToken: string;
}

interface ProfileData {
  id: number;
  name: string;
  colorIndex: number;
  imgUrl: string | null;
}

const ProfileHome: React.FC<ProfileHomeProps> = ({ accountAccessToken }) => {
  const [profileList, setProfileList] = useState<ProfileData[]>([]);
  const [isProfileHome, setIsProfileHome] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const handleOpenNewProfile = () => {
    setIsProfileHome(false);
  };

  const getProfileList = async () => {
    const res = await myAxios('get', 'api/v1/accounts/profiles', null, true, accountAccessToken);
    setProfileList(res.data.response.list);
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
    setOpacity(1);
  }, [opacity]);

  return (
    <ProfileHomeContainer opacity={opacity} key={opacity.toString()}>
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
    id: 0,
    name: '',
    colorIndex: 0,
    imgUrl: null,
  });

  const selectProfile = ({ id, name, colorIndex, imgUrl }: ProfileData) => {
    setIsSelectedProfile(true);
    setSelectedProfileData({
      id,
      name,
      colorIndex,
      imgUrl,
    });
  };

  const goToProfileHome = () => {
    setIsSelectedProfile(false);
    setSelectedProfileData({
      id: 0,
      name: '',
      colorIndex: 0,
      imgUrl: null,
    });
  };

  const handleSubmitProfileLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      profileId: selectedProfileData.id,
      pin: data.get('pin'),
    };
    try {
      const res = await myAxios(
        'post',
        'api/v1/auth/profiles/login',
        body,
        true,
        accountAccessToken,
      );
      const profileToken = res.data.response.accessToken;
      handleRefreshProfileAccessToken(profileToken);
    } catch (error) {
      const err = error as AxiosError;
      makeNotification((err.response as CustomAxiosResponse).data.message);
    }
  };

  return (
    <>
      {isSelectedProfile ? (
        <>
          <ProfileHomeButton onClick={goToProfileHome}>
            <SquareImg src='../../../public/img/back.png' length='60px' />
          </ProfileHomeButton>
          <SelectedProfileContainer onSubmit={handleSubmitProfileLogin}>
            <SelectedProfile
              index={selectedProfileData.imgUrl ? 0 : selectedProfileData.colorIndex}
            >
              {selectedProfileData.imgUrl ? (
                <div className={'profileImg'}>
                  <p>{selectedProfileData.name}</p>
                  <SquareImg src={selectedProfileData.imgUrl} length='100%' opacity={0.3} />
                </div>
              ) : (
                selectedProfileData.name
              )}
            </SelectedProfile>
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
          {profileList?.map(({ id, name, imgUrl }, index) => {
            return (
              <Profile
                key={index}
                index={imgUrl ? 0 : index + 1}
                onClick={() => selectProfile({ id, name, colorIndex: index + 1, imgUrl })}
              >
                {imgUrl ? (
                  <div className={'profileImg'}>
                    <p>{name}</p>
                    <SquareImg src={imgUrl} length='100%' opacity={0.3} />
                  </div>
                ) : (
                  name
                )}
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

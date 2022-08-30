import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import NewProfileForm from './NewProfileForm';

interface ProfileLoginProps {
  token: string;
}

interface ProfileData {
  profileId: number;
  name: string;
  age: number;
  gender: string;
}

const ProfileLogin: React.FC<ProfileLoginProps> = ({ token }) => {
  const [profileList, setProfileList] = useState<ProfileData[]>([]);
  const [isNewProfile, setIsNewProfile] = useState(false);

  const handleOpenNewProfile = () => {
    setIsNewProfile(true);
  };

  useEffect(() => {
    const getProfileList = async (token: string) => {
      const res = await axios.get('https://neighbor42.com:8181/api/v1/accounts/profiles', {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setProfileList(res.data.response.profiles);
    };
    try {
      getProfileList(token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ProfileLoginContainer>
      {isNewProfile ? (
        <NewProfileForm setIsNewProfile={setIsNewProfile} />
      ) : (
        <>
          <Profiles profileList={profileList} />
          <NewProfileButton onClick={handleOpenNewProfile}>신규 프로필 등록</NewProfileButton>
        </>
      )}
    </ProfileLoginContainer>
  );
};

interface ProfilesProps {
  profileList: ProfileData[];
}

const Profiles: React.FC<ProfilesProps> = ({ profileList }) => {
  return (
    <>
      {profileList.map(({ profileId, name }, index) => {
        return <Profile key={index}>{name}</Profile>;
      })}
    </>
  );
};

const ProfileLoginContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1101;
`;

const NewProfileButton = styled.button``;

const Profile = styled.div``;

export default ProfileLogin;

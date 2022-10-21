import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '~/others/store';
import styled from 'styled-components';
import { shadowCSSForStyledComponent } from '~/others/cssLibrary';
import SquareImg from '../atoms/Img';
import { ProfileHomeButton } from './ProfileHome/styled';
import myAxios from '~/others/myAxios';

interface NewProfileFormProps {
  setIsProfileHome: Function;
  accountAccessToken: string;
}

const NewProfileForm: React.FC<NewProfileFormProps> = ({
  setIsProfileHome,
  accountAccessToken,
}) => {
  const [isFile, setIsFile] = useState(false);

  const fileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFile(e.target.value ? true : false);
  };

  const handleSubmitNewProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinData = {
      name: data.get('name') ?? '',
      age: data.get('age') ?? '',
      sex: data.get('sex') ?? '',
      pin: data.get('pin') ?? '',
      rePin: data.get('re-pin') ?? '',
      img: data.get('img') ?? '',
    };
    const { name, age, sex, pin, rePin, img } = joinData;

    const pinRegex = /\d{4}$/;
    if (!pinRegex.test(pin.toString())) return;
    if (pin !== rePin) return;

    try {
      const body =
        (img as File).size === 0
          ? {
              name,
              age: Number(age),
              pin,
              gender: sex,
            }
          : {
              name,
              age: Number(age),
              pin,
              gender: sex,
              img,
            };

      await myAxios(
        'post',
        'api/v1/auth/profiles/new',
        body,
        true,
        accountAccessToken,
        'multipart/form-data',
      );
      setIsProfileHome(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ProfileHomeButton onClick={() => setIsProfileHome(true)}>
        <SquareImg src='../../../public/img/back.png' length='60px' />
      </ProfileHomeButton>
      <NewProfileFormContainer onSubmit={handleSubmitNewProfile}>
        <Typography
          variant='h6'
          noWrap
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          새 프로필 생성하기
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='이름'
          name='name'
          autoComplete='name'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='age'
          label='나이'
          name='age'
          autoComplete='age'
          autoFocus
        />
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FormLabel id='radioButtonsForSex' sx={{ m: 1, marginRight: '20px' }}>
            성별
          </FormLabel>
          <RadioGroup row name='sex' defaultValue='MALE'>
            <FormControlLabel value='MALE' control={<Radio />} label='남성' />
            <FormControlLabel value='FEMALE' control={<Radio />} label='여성' />
          </RadioGroup>
        </FormControl>
        <label>사진 첨부</label>
        <div className='filebox'>
          <label htmlFor='file' className={isFile ? 'done' : ''}>{`${
            isFile ? '프로필 사진 등록 완료' : '프로필 사진 추가하기'
          }`}</label>
          <input
            type={'file'}
            id='file'
            accept={'image/*'}
            name={'img'}
            onChange={fileUpload}
          ></input>
        </div>

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
        <TextField
          margin='normal'
          required
          fullWidth
          id='re-pin'
          label='pin 번호 확인'
          name='re-pin'
          type='password'
          autoComplete='re-pin'
          autoFocus
        />
        <Button sx={{ marginTop: '20px' }} type='submit' fullWidth variant='contained'>
          프로필 생성
        </Button>
      </NewProfileFormContainer>
    </>
  );
};

const NewProfileFormContainer = styled.form`
  margin: 0 20px;
  padding: 20px 20px;
  background: #fff;
  ${shadowCSSForStyledComponent}
  & > label {
    display: none;
  }
  & .filebox label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    color: #999;
    cursor: pointer;
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin: 5px 0;
  }

  & .filebox input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
  };
};

export default connect(mapStateToProps)(NewProfileForm);

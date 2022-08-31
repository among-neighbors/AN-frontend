import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '~/others/store';

interface NewProfileFormProps {
  setIsNewProfile: Function;
  accountAccessToken: string;
}

const NewProfileForm: React.FC<NewProfileFormProps> = ({ setIsNewProfile, accountAccessToken }) => {
  const handleSubmitNewProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinData = {
      name: data.get('name') ?? '',
      age: data.get('age') ?? '',
      sex: data.get('sex') ?? '',
      pin: data.get('pin') ?? '',
      rePin: data.get('re-pin') ?? '',
    };
    const { name, age, sex, pin, rePin } = joinData;

    const pinRegex = /\d{4}$/;
    if (!pinRegex.test(pin.toString())) return;
    if (pin !== rePin) return;

    try {
      const res = await axios.post(
        'https://neighbor42.com:8181/api/v1/auth/profiles/new',
        {
          name,
          age: Number(age),
          pin,
          gender: sex,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accountAccessToken}`,
          },
          withCredentials: true,
        },
      );
      setIsNewProfile(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmitNewProfile}>
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
      <Button type='submit' fullWidth variant='contained'>
        프로필 등록
      </Button>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
  };
};

export default connect(mapStateToProps)(NewProfileForm);

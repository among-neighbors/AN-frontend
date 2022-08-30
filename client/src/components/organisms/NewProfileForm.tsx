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
import React from 'react';

interface NewProfileFormProps {
  setIsNewProfile: Function;
}

const NewProfileForm: React.FC<NewProfileFormProps> = ({ setIsNewProfile }) => {
  const handleSubmitNewProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'));

    // setIsNewProfile(true);
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
        <RadioGroup row>
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
        id='pin-again'
        label='pin 번호 확인'
        name='pin-again'
        type='password'
        autoComplete='pin-again'
        autoFocus
      />
      <Button type='submit' fullWidth variant='contained'>
        프로필 등록
      </Button>
    </Box>
  );
};

export default NewProfileForm;

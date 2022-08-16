import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormControl } from '@mui/material';

interface WritingData {
  title: string;
  boundary: string;
  body: string;
}

const Writting = () => {
  const [writingData, setWritingData] = useState<WritingData>({
    title: '',
    boundary: 'complex',
    body: '',
  });
  const { title, boundary, body } = writingData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case 'title':
        setWritingData({
          title: event.target.value,
          boundary,
          body,
        });
        break;
      case 'isLine':
        setWritingData({
          title,
          boundary: event.target.value,
          body,
        });
        break;
      case 'body':
        setWritingData({
          title,
          boundary,
          body: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handlePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(writingData);
  };
  return (
    <>
      <Box
        component='form'
        onSubmit={handlePost}
        action='#'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          width: '100%',
          padding: '0 20px',
          marginBottom: '30px',
          '& .MuiTextField-root': {
            m: 1,
            width: '100%',
          },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          label='제목'
          placeholder='게시글 제목을 입력하세요.'
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'title')}
          variant='standard'
        />

        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FormLabel id='radioButtonsForTypeOfBoard' sx={{ m: 1, marginRight: '20px' }}>
            게시글 유형
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='radioButtonsForTypeOfBoard'
            value={boundary}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'isLine')}
          >
            <FormControlLabel value='complex' control={<Radio />} label='단지' />
            <FormControlLabel value='line' control={<Radio />} label='라인' />
          </RadioGroup>
        </FormControl>

        <TextField
          label='내용'
          placeholder='게시글 내용을 입력하세요.'
          multiline
          rows={12}
          value={body}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, 'body')}
          variant='standard'
        />

        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
          <Button sx={{ whiteSpace: 'nowrap', height: '40px' }} type='submit' variant='contained'>
            글 작성
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Writting;

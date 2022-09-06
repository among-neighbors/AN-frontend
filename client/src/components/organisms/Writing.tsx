import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormControl } from '@mui/material';
import myAxios from '~/others/myAxios';
import { Obj } from '~/others/integrateInterface';
import { connect } from 'react-redux';
import { RootState } from '~/others/store';
import { useNavigate } from 'react-router-dom';

interface WritingProps {
  type: string;
  profileAccessToken: string;
}

const Writing: React.FC<WritingProps> = ({ type, profileAccessToken }) => {
  const navigation = useNavigate();

  const handleSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body =
      type === 'community'
        ? {
            title: data.get('title'),
            content: data.get('content'),
            category: data.get('category'),
            scope: data.get('scope'),
          }
        : {
            title: data.get('title'),
            content: data.get('content'),
          };
    const res = await myAxios('post', `${NewAPIbyType[type]}`, body, undefined, profileAccessToken);
    navigation(`/${type}`);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmitPost}
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
      autoComplete='off'
    >
      <TextField
        name='title'
        label='제목'
        placeholder='게시글 제목을 입력하세요.'
        required
        variant='standard'
      />

      {type === 'community' ? (
        <>
          <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel id='radioButtonsForScopeOfBoard' sx={{ m: 1, marginRight: '20px' }}>
              게시글 유형
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='radioButtonsForScopeOfBoard'
              name='scope'
              defaultValue='ALL'
            >
              <FormControlLabel value='ALL' control={<Radio />} label='전체' />
              <FormControlLabel value='LINE' control={<Radio />} label='라인' />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel id='radioButtonsForCategory' sx={{ m: 1, marginRight: '20px' }}>
              카테고리
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='radioButtonsForCategory'
              name='category'
              defaultValue='PLAIN'
            >
              <FormControlLabel value='PLAIN' control={<Radio />} label='기본글' />
              <FormControlLabel value='QNA' control={<Radio />} label='질문글' />
              <FormControlLabel value='SELLING' control={<Radio />} label='팝니다' />
              <FormControlLabel value='BUYING' control={<Radio />} label='삽니다' />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        <></>
      )}
      <TextField
        name='content'
        label='내용'
        placeholder='게시글 내용을 입력하세요.'
        multiline
        rows={12}
        required
        variant='standard'
      />

      <Box sx={{ justifyContent: 'right', display: 'flex' }}>
        <Button sx={{ whiteSpace: 'nowrap', height: '40px' }} type='submit' variant='contained'>
          {submitTextByTypes[type]}
        </Button>
      </Box>
    </Box>
  );
};

const submitTextByTypes: Obj<string> = {
  community: '글 작성',
  complaint: '민원 작성',
};

const NewAPIbyType: Obj<string> = {
  complaint: `api/v1/reports/new`,
  community: `api/v1/communities`,
};

const mapStateToProps = (state: RootState) => {
  return {
    profileAccessToken: state.accessTokenReducer.profileAccessToken,
  };
};

export default connect(mapStateToProps)(Writing);

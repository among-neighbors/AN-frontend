import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
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
import { accessTokenState, RootState } from '~/others/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { APIbyType } from '~/others/integrateVariable';

interface WritingProps {
  type: string;
  accessToken: accessTokenState;
  isReadyForRequestAPI: boolean;
}

const Writing: React.FC<WritingProps> = ({ type, accessToken, isReadyForRequestAPI }) => {
  const { accountAccessToken, profileAccessToken } = accessToken;
  const navigation = useNavigate();
  const location = useLocation();
  const form = useRef();
  const [boardId, setBoardId] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [scope, setScope] = useState<string>();
  const [isPUT, setIsPUT] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    if (isPUT) {
      await myAxios('put', `${APIbyType[type]}/${boardId}`, body, undefined, profileAccessToken);
    } else {
      await myAxios('post', `${NewAPIbyType[type]}`, body, undefined, profileAccessToken);
    }
    navigation(`/${type}`);
  };

  const getWrittenData = async (id: number) => {
    const boardRes = await myAxios(
      'get',
      `${APIbyType[type]}/${id}`,
      null,
      true,
      accountAccessToken,
    );
    const profileRes = await myAxios('get', `api/v1/profiles/me`, null, true, profileAccessToken);
    if (profileRes.data.response.id !== boardRes.data.response.writer.id) navigation(-1);
    const { title, content, category, scope } = boardRes.data.response;
    setIsPUT(true);
    setTitle(title);
    setContent(content);
    if (type === 'community') {
      setCategory(category);
      setScope(scope);
    }
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    const query = parse(location.search);
    if (!query.id) return;
    setBoardId(query.id.toString());
    getWrittenData(Number(query.id));
  }, [isReadyForRequestAPI]);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
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
      ref={form}
    >
      <TextField
        name='title'
        label='제목'
        placeholder='게시글 제목을 입력하세요.'
        required
        variant='standard'
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
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
              value={scope}
              onChange={(e) => {
                setScope(e.target.value);
              }}
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
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
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
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
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
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(Writing);

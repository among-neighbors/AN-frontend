import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Bool } from '~/others/integrateInterface';
import { APIbyType } from '~/others/integrateVariable';
import myAxios from '~/others/myAxios';
import { accessTokenState, RootState } from '~/others/store';
import { useNavigate } from 'react-router-dom';

interface BoardNavProps {
  type: string;
  isMine?: Bool;
  boardId?: string;
  accessToken: accessTokenState;
}

const BoardNav: React.FC<BoardNavProps> = ({ type, isMine, boardId, accessToken }) => {
  const navigate = useNavigate();
  const handleDeletePost = async () => {
    await myAxios(
      'delete',
      `${APIbyType[type]}/${boardId}`,
      null,
      true,
      accessToken.profileAccessToken,
    );
    navigate(`/${type}`);
  };

  return (
    <BoardNavContainer>
      <Box
        component={Link}
        to={`/${type}`}
        sx={{
          width: '70px',
          height: '40px',
          color: '#000',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        목록
      </Box>
      {isMine === 'true' && (
        <>
          <Box
            component={Link}
            to={`/${type}/writing?id=${boardId}`}
            sx={{
              width: '70px',
              height: '40px',
              color: '#000',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            수정
          </Box>
          <Button
            onClick={handleDeletePost}
            sx={{
              width: '70px',
              height: '40px',
              color: '#000',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            삭제
          </Button>
        </>
      )}
    </BoardNavContainer>
  );
};

const BoardNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding-right: 30px;
  gap: 10px;
`;

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(BoardNav);

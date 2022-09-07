import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Bool } from '~/others/integrateInterface';

interface BoardNavProps {
  type: string;
  isMine?: Bool;
  boardId?: string;
}

const BoardNav: React.FC<BoardNavProps> = ({ type, isMine, boardId }) => {
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

export default BoardNav;

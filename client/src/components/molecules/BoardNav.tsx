import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BoardNavProps {
  type: string;
}

const BoardNav: React.FC<BoardNavProps> = ({ type }) => {
  return (
    <BoardNavContainer>
      <Link
        to={`/${type}`}
        style={{
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
      </Link>
      {/* <Link
        to='/'
        style={{
          height: '40px',
          color: '#000',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <ArrowBackIcon fontSize='small' />
        이전 글
      </Link>
      <Link
        to='/'
        style={{
          height: '40px',
          color: '#000',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        다음 글
        <ArrowForwardIcon fontSize='small' />
      </Link> */}
    </BoardNavContainer>
  );
};

const BoardNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  padding-right: 30px;
  gap: 30px;
`;

export default BoardNav;

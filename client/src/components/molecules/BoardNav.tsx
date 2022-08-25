import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

interface BoardNavProps {
  type: String;
}

const BoardNav = ({ type }: BoardNavProps) => {
  return (
    <>
      <div className='boardNav'>
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
        </Link>
      </div>
      <style jsx>{`
        .boardNav {
          width: 100%;
          display: flex;
          justify-content: right;
          padding-right: 30px;
          gap: 30px;
        }
      `}</style>
    </>
  );
};

export default BoardNav;

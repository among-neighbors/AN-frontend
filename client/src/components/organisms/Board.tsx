import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { TypeData } from '~/others/integrateInterface';
import { rangeByType, categoryByType } from '~/others/integrateVariable';
import BoardNav from '../molecules/BoardNav';

interface BoardProps {
  boardData: TypeData;
  type: String;
}

const Board: React.FC<BoardProps> = ({ boardData, type }) => {
  return (
    <Box sx={{ maxWidth: '1200px', width: '100%' }}>
      <Box
        className='boardHeader'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '80px',
          borderTop: 'solid #666 3px',
        }}
      >
        <Typography variant='h5' sx={{ padding: '11px 10px', height: '50px' }}>
          {boardData.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '600px',
            padding: '0 12px',
            justifyContent: 'space-between',
            '& p': {
              color: '#666',
              fontSize: '14px',
            },
          }}
        >
          {boardData.type && <p>{`유형 : ${rangeByType[boardData.type]}`}</p>}
          {boardData.category && <p>{`카테고리 : ${categoryByType[boardData.category]}`}</p>}
          <p>{`작성자 : ${boardData.writer}`}</p>
          <p>{`등록일 : ${boardData.date}`}</p>
        </Box>
      </Box>
      <Box
        className='textBox'
        sx={{
          border: 'solid #d9d9d9',
          minHeight: '350px',
          borderWidth: '1.5px 0',
          padding: '30px 10px 50px 10px',
          marginBottom: '5px',
        }}
      >
        {boardData.body.split('\n').map((str, index) => {
          return (
            <Typography
              key={index}
              sx={{
                lineHeight: '24px',
                marginBottom: '9px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {str}
            </Typography>
          );
        })}
      </Box>
      <BoardNav type={type} />
    </Box>
  );
};

export default Board;

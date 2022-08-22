import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import BoardNav from '../molecules/BoardNav';

interface Data {
  ID: string;
  title: string;
  body: string;
  type: boolean;
  writer: string;
  date: string;
}

interface BoardProps {
  row: Data | null;
  type: String;
}

const Board = ({ row, type }: BoardProps) => {
  if (!row) return <></>;
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
          {row.title}
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
          <p>{`유형 : ${row.type ? '라인' : '단지'}`}</p>
          <p>{`작성자 : ${row.writer}`}</p>
          <p>{`등록일 : ${row.date}`}</p>
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
        {row.body.split('\n').map((str, index) => {
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

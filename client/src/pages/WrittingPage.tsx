import { Box } from '@mui/system';
import TableNav from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import Writting from '~/components/organisms/Writting';

interface WrittingPageProps {
  type: string;
}

const WrittingPage = ({ type }: WrittingPageProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader type={type} />
      {type === 'community' ? <TableNav type={type} /> : <></>}
      <Writting />
    </Box>
  );
};

export default WrittingPage;

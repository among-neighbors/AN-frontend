import { Box } from '@mui/system';
import TableNav from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import Writting from '~/components/organisms/Writting';

const CommunityWrittingPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader type='community' />
      <TableNav type='community' />
      <Writting />
    </Box>
  );
};

export default CommunityWrittingPage;

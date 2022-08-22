import { Box } from '@mui/system';
import PageHeader from '~/components/organisms/PageHeader';
import Writting from '~/components/organisms/Writting';

const ComplaintWrittingPage = () => {
  return (
    <Box>
      <PageHeader type='complaint' />
      <Writting />
    </Box>
  );
};

export default ComplaintWrittingPage;

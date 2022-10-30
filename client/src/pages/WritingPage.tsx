import { Box } from '@mui/system';
import TableNav from '~/components/molecules/TableNav';
import Footer from '~/components/organisms/Footer';
import PageHeader from '~/components/organisms/PageHeader';
import Writing from '~/components/organisms/Writing';

interface WritingPageProps {
  type: string;
}

const WritingPage = ({ type }: WritingPageProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader type={type} />
      {type === 'community' ? <TableNav type={type} /> : <></>}
      <Writing type={type} />
      <Footer />
    </Box>
  );
};

export default WritingPage;

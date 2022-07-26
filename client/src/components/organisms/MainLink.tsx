import { Button } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface MainLinkProps {
  buttonText: string;
  src: string;
  nav: string;
}

const MainLink: React.FC<MainLinkProps> = ({ buttonText, src, nav }) => {
  const navigate = useNavigate();
  return (
    <>
      <StyledMainLink
        onClick={() => navigate(`/${nav}`)}
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
          },
          width: 'calc(100% / 3)',
          height: '100%',
        }}
      >
        <StyledImgMd src={src} />
        <Button variant='outlined' sx={{ borderRadius: '20px' }}>
          {buttonText}
        </Button>
      </StyledMainLink>
      <StyledMainLink
        onClick={() => navigate(`/${nav}`)}
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
            md: 'none',
          },

          width: '100%',
          height: 'calc(100% / 1.5)',
        }}
      >
        <StyledImgSm src={src} width='20%' />

        <Button variant='outlined' sx={{ borderRadius: '20px', fontSize: '10px' }}>
          {buttonText}
        </Button>
      </StyledMainLink>
      <StyledMainLink
        onClick={() => navigate(`/${nav}`)}
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
            md: 'none',
          },
          width: '90%',
          height: 'calc(100% / 3)',
        }}
      >
        <StyledImgXs src={src} />

        <Button variant='outlined' sx={{ borderRadius: '20px', fontSize: '8px' }}>
          {buttonText}
        </Button>
      </StyledMainLink>
    </>
  );
};

const StyledImgMd = styled.img`
  width: 35%;
  margin: 30px;
`;
const StyledImgSm = styled.img`
  width: 35%;
  margin: 20px;
`;
const StyledImgXs = styled.img`
  height: 30%;
  margin: 15px;
`;

const StyledMainLink = styled(Box)`
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  opacity: 0.9;
  transition: 0.5s;
  flex-direction: column;
  &:hover {
    background: #999;

    cursor: pointer;
    & > button {
      background: #ec8034;
      color: #fff;
    }
  }
`;

export default MainLink;

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
        <StyledImg src={src} />
        <Button variant='outlined' sx={{ position: 'absolute' }}>
          {buttonText}
        </Button>
      </StyledMainLink>
      <StyledMainLink
        onClick={() => navigate(`/${nav}`)}
        sx={{
          display: {
            xs: 'flex',
            sm: 'flex',
            md: 'none',
          },
          width: '100%',
          height: 'calc(100% / 3)',
        }}
      >
        <StyledImg src={src} />
        <Button variant='outlined' sx={{ position: 'absolute' }}>
          {buttonText}
        </Button>
      </StyledMainLink>
    </>
  );
};

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
`;

const StyledMainLink = styled(Box)`
  align-items: center;
  justify-content: center;
  background: #111;
  transition: 0.5s;
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

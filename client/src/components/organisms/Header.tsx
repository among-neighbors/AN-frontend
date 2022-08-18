import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SquareImg from '~/components/atoms/Img';
import { Link } from 'react-router-dom';
import HelpSideBar from '~/components/organisms/HelpSideBar';

const pages: {
  name: string;
  link: string;
}[] = [
  {
    name: '공지',
    link: '/notice',
  },
  {
    name: '민원',
    link: 'complaint',
  },
  {
    name: '커뮤니티',
    link: 'community',
  },
];
const settings = ['도움 요청', '도움 리스트', '로그아웃'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position='fixed' sx={{ height: '70px' }}>
        <Container
          maxWidth='xl'
          sx={{
            height: '100%',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              height: '100%',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                alignItems: 'center',
              }}
            >
              <SquareImg src='../../../public/img/iconWhite.png' />
              이웃사이
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.link}
                  >
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant='h5'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                alignItems: 'center',
              }}
            >
              <SquareImg src='../../../public/img/iconWhite.png' />
              이웃사이
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', position: 'relative' }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  background: '#fff',
                  width: '40px',
                  height: '40px',
                  '&:hover': {
                    background: '#f11000',
                    '& .nonHover': {
                      display: 'none',
                    },
                    '& .hover': {
                      display: 'flex',
                    },
                  },
                }}
              >
                <Avatar
                  className='nonHover'
                  sx={{
                    width: '28px',
                    height: '28px',
                  }}
                  src='../../../public/img/sirenRed.png'
                />
                <Avatar
                  className='hover'
                  sx={{
                    width: '28px',
                    height: '28px',
                    display: 'none',
                  }}
                  src='../../../public/img/sirenWhite.png'
                />
              </IconButton>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  background: '#fff',
                  width: '40px',
                  height: '40px',
                  '&:hover': {
                    background: '#f11000',
                    '& .nonHover': {
                      display: 'none',
                    },
                    '& .hover': {
                      display: 'flex',
                    },
                  },
                }}
              >
                <Avatar
                  className='nonHover'
                  sx={{
                    width: '28px',
                    height: '28px',
                  }}
                  src='../../../public/img/sirenRed.png'
                />
                <Avatar
                  className='hover'
                  sx={{
                    width: '28px',
                    height: '28px',
                    display: 'none',
                  }}
                  src='../../../public/img/sirenWhite.png'
                />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='x' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <HelpSideBar></HelpSideBar>
      </AppBar>
    </>
  );
};

export default Header;

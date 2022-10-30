import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  width: 100%;
  min-height: 110px;
  height: 110px;
  margin: 50px 0 0 10px;
  display: flex;
  align-items: center;
  padding: 4px 0 4px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: grey;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 110px;

    & > div {
      margin: '5px 0 0 20px';
    }
  }
`;

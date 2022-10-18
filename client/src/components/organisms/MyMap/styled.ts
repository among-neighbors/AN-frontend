import styled from 'styled-components';

export const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
  background: #000;
  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: relative;
    width: 100%;
    height: 70px;
    background: #fff;
    & .back {
      width: 40px;
      height: 40px;
      filter: invert(1);
      cursor: pointer;
    }

    & .icon {
      position: absolute;
      left: calc(50% - 23px);
    }
  }
`;

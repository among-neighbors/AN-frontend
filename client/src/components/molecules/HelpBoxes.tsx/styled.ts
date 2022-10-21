import styled from 'styled-components';

const HelpFinBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  outline: solid #ddd;
  outline-width: 0.5px;
  color: #000;
  gap: 5px;
  padding: 10px 10px;
  & > h5 {
    font-size: 13px;
    font-weight: 500;
  }
  & > p {
    font-size: 12px;
    color: #999;
  }
`;

const HelpCallBoxContainer = styled.div`
  width: 100%;
  padding: 3px 13px;
  color: #000;
`;

const HelpCallBoxInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  gap: 8px;
  padding: 10px 0;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  background: #fff;
  & .close {
    justify-content: end;
    padding: 0 20px;
    & > button {
      width: 20px;
      height: 20px;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
    }
  }
  & > p {
    display: flex;
    justify-content: center;
    padding: 0 10px;
    font-size: 1.05em;
  }
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export { HelpFinBoxContainer, HelpCallBoxContainer, HelpCallBoxInner };

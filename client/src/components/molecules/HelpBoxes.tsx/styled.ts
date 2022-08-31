import styled from 'styled-components';

const HelpFinBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60px;
  outline: solid #ddd;
  outline-width: 0.5px;
  color: #000;
  gap: 5px;
  padding-left: 10px;
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
  height: 100px;
  padding: 13px;
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
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  & > p {
    display: flex;
    justify-content: center;
    font-size: 1.05em;
  }
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export { HelpFinBoxContainer, HelpCallBoxContainer, HelpCallBoxInner };

import { createGlobalStyle } from 'styled-components';

const shadowCssForMUI = {
  borderRadius: '4px',
  boxShadow:
    '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)',
};

const shadowCSSForStyledComponent = `
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'NotoSansKR-Medium' !important;
    }
    html,
      body,
      #root,
      #root > div {
        width: 100%;
      }
      #root {
        display: flex;
        padding-top: 70px;
      }
    a {
        color: inherit;
        text-decoration: none;
    }
    .disNone {
      display: none !important;
    }
`;

export { shadowCSSForStyledComponent, shadowCssForMUI, GlobalStyle };

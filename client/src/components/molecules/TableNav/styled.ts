const defaultStyleOfTableNavButton = {
  whiteSpace: 'nowrap',
  height: '40px',
  width: '105px',
  borderRadius: '0',
};

const clickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  fontWeight: 700,
  outline: 'solid 1px #f6be9a',
  zIndex: 1,
};

const nonClickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  outline: 'solid 1px #BDBDBD',
  color: '#808080',
};

export { clickedStyleOfTableNavButton, nonClickedStyleOfTableNavButton };

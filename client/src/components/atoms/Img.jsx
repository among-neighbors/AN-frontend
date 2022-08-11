import styled from 'styled-components';

const StyledImg = styled.img`
  width: ${(props) => props.length};
  height: ${(props) => props.length};
  filter: invert(${(props) => (props.invert ? 1 : 0)});
  object-fit: ${(props) => props.objectFit};
  border-radius: ${(props) => props.radius};
  opacity: ${(props) => props.opacity};
`;

const SquareImg = ({
  length = '40px',
  invert = false,
  objectFit = 'fill',
  radius = '0',
  opacity = 1,
  src,
}) => {
  const props = {
    length,
    invert,
    objectFit,
    radius,
    opacity,
  };

  return <StyledImg src={src} {...props} />;
};

export default SquareImg;

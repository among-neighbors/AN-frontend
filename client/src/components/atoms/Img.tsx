import styled from 'styled-components';

interface SquareImgProps extends StyledImgProps {
  src: string;
}

const SquareImg: React.FC<SquareImgProps> = ({
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

interface StyledImgProps {
  length?: string;
  invert?: boolean;
  objectFit?: string;
  radius?: string;
  opacity?: number;
}

const StyledImg = styled.img<StyledImgProps>`
  width: ${(props) => props.length};
  height: ${(props) => props.length};
  filter: invert(${(props) => (props.invert ? 1 : 0)});
  object-fit: ${(props) => props.objectFit};
  border-radius: ${(props) => props.radius};
  opacity: ${(props) => props.opacity};
`;

export default SquareImg;

import React from 'react';
import { FooterWrapper } from './styled';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div>
        <img height='30px' src='../../../../public/img/only_logo.svg' />
        <div>
          <p>{`Copyright © KNUD4 All Rights Reserved.`}</p>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;

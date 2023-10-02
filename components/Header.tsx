import React from "react";
import styled from "styled-components";
import AirbinLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbinLogoTextIcon from "../public/static/svg/logo/logo_text.svg";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: conter;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0,0,0,0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <div className="header-logo-wrapper">
        <AirbinLogoIcon classname="header-logo" />
        <AirbinLogoTextIcon />
      </div>
    </Container>

  );
};

export default Header;
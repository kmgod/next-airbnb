import React, { useState } from "react";
import styled from "styled-components";
import AirbinLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbinLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import Link from "next/link";
import palette from "../styles/palette";

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
  /** 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-ratius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0,0,0,0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0,0,0,0.12);
      }
    }    
  }
  .modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: conter;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .modal-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.75);
      z-index: 10;
    }
    .model-contents {
      width: 400px;
      height: 400px;
      background-color: white;
      z-index: 11;
    }
  }
`;

const Header: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbinLogoIcon classname="header-logo" />
          <AirbinLogoTextIcon />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button 
          type="button" 
          className="header-sign-up-button"
          onClick={()=> setModalOpened(true)}
        >
          회원가입
        </button>
        <button type="button" className="header-login-button">
          로그인
        </button>        
      </div>
      {modalOpened && (
        <div className="modal-wrapper">
          <div
            className="modal-background"
            role="presentation"
            onClick={() => setModalOpened(false)}
          />
          <div className="modal-contents" />
        </div>
      )}
    </Container>

  );
};

export default Header;
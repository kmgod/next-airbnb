import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import MailIcon from '../../public/static/svg/input/mail.svg';
import PersonIcon from '../../public/static/svg/input/person.svg';
import OpenedEyeIcon from '../../public/static/svg/input/opened-eye.svg';
import ClosedEyeIcon from '../../public/static/svg/input/closed_eye.svg';
import palette from '../../styles/palette';
import Selector from '../common/selector/Selector';
import { monthList, dayList, yearList } from '../../lib/staticData';
import Button from '../common/button/Button';
import { signupAPI } from '../../lib/api/auth';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../store/auth';
import Input from '../common/Input';
import useValidateMode from '../../hooks/useValidateMode';

const Container = styled.div`
  .sign-up-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selector {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selctor {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selctor {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selctor {
      width: 33.3333%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb}
  }
  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const PASSWORD_MIN_LENGTH = 8;

interface IProps {
  closeModalPortal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModalPortal }) => {

  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [birthYear, setBirthYear] = useState<string | null>(null);
  const [birthDay, setBirthDay] = useState<string | null>(null);
  const [birthMonth, setBirthMonth] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { validateMode, setValidateMode } = useValidateMode();

  //* 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setIsPasswordHided(!isPasswordHided);
  }

  //* password가 이름이나 이메일을 포함하는지 여부
  const isPasswordHasNameOrEmail = useMemo(() =>
    !password ||
    !lastname ||
    password.includes(lastname) ||
    password.includes(email.split('@')[0]),
    [password, lastname, email]
  );

  //* 비밀번호가 최소 자리수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  )

  //* 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password]
  );

  //* 인풋값 발리데이션 체크 하기
  const validateSignUpForm = () => {
    if (!email) {
      return false;
    }
    if (!lastname) {
      return false;
    }
    if (!firstname) {
      return false;
    }
    if (!birthMonth) {
      return false;
    }
    if (!birthDay) {
      return false;
    }
    if (!birthYear) {
      return false;
    }
    if (
      !password ||
      isPasswordHasNameOrEmail ||
      !isPasswordHasNumberOrSymbol ||
      !isPasswordOverMinLength
    ) {
      return false;
    }
    return true;
  };

  //* 가입 Form제출
  const onSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    if(validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월','')}-${birthDay}`
          ),
        };
        const { data } = await signupAPI(signUpBody);
        dispatch(userActions.setUser(data));
        closeModalPortal();
      } catch (e) {
        console.log(e);
        alert(e);
      }
    }
  }

  useEffect(() => {
    setValidateMode(false);
  }, []);

 
  return (
    <Container>
      <form onSubmit={onSubmitSignup}>
        <div className="sign-up-input-wrapper">
          <Input 
            name="email"
            placeholder="이메일 주소" 
            type="email" 
            icon={<MailIcon />} 
            value={email}
            isValid={!!email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage='이메일주소가 필요합니다'
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input 
            name='firstname'
            placeholder="이름(예:길동)" 
            icon={<PersonIcon />} 
            value={firstname}
            isValid={!!firstname}
            useValidation={validateMode}
            onChange={(e) => setFirstname(e.target.value)}
            errorMessage='이름을 입력하세요'
          />
        </div>
        <div className="sign-up-input-wrapper"> 
          <Input 
            name='lastname'
            placeholder="성(예: 홍)" 
            icon={<PersonIcon />} 
            value={lastname}
            isValid={!!lastname}
            useValidation={validateMode}
            onChange={(e) => setLastname(e.target.value)} 
            errorMessage='성을 입력하세요'
          />
        </div>
        <div className="sign-up-input-wrapper sign-up-password-input-wrapper">
          <Input 
            name='password'
            placeholder="비밀번호 설정하기" 
            type={isPasswordHided ? "password" : "text"}
            icon={
              isPasswordHided ? (
                <ClosedEyeIcon onClick={toggleHidePassword} />
              ) : (
                <OpenedEyeIcon onClick={toggleHidePassword} />
              )
            } 
            onFocus={() => setPasswordFocused(true)}
            value={password}
            isValid={!!password}
            useValidation={validateMode}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage='비밀번호를 입력하세요'
          />
        </div>
        
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={!isPasswordHasNameOrEmail}
              errorMessage='비밀번호에 본인이름이나 이메일 주소를 포함할 수 없습니다'
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              errorMessage='비밀번호는 최소 8자 입니다'
            />
            <PasswordWarning
              isValid={!isPasswordHasNumberOrSymbol}
              errorMessage='비밀번호는 숫자와 기호를 포함해야 합니다.'
            />          
          </>
        )}
        <h4>생일</h4>
        <p className="sign-up-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비앤비 이용자에게 공개되지 않습니다.
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector 
            options={['월', ...monthList]} 
            disabledOptions={["월"]}
            value={birthMonth || '월'}
            onChange={(e) => setBirthMonth(e.target.value)}
            isValid={!!birthMonth}
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector 
            options={['일', ...dayList]} 
            disabledOptions={["일"]}
            value={birthDay || '월'}
            onChange={(e) => setBirthDay(e.target.value)}
            isValid={!!birthDay}
            />
          </div> 
          <div className="sign-up-modal-birthday-yeay-selector">
            <Selector 
            options={['년', ...yearList]} 
            disabledOptions={["년"]}
            value={birthYear || '년'}
            onChange={(e) => setBirthYear(e.target.value)}
            isValid={!!birthYear}
            />
          </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
          <Button type="submit">가입하기</Button>
        </div>
        <p>이미 에어비엔비 계정이 있나요?
          <span
            className='sign-up-modal-set-login'
            role='presentation'
            onClick={() => dispatch(authActions.setAuthMode("login"))}
          >로그인</span>
        </p>
      </form>
    </Container>
  )
};

export default SignUpModal;
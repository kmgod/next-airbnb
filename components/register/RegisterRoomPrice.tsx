import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import RegisterRoomFooter from './RegisterRoomFooter';
import { registerRoomActions } from '../../store/registerRoom';
import Input from '../common/Textarea';
import { makeMoneyString } from '../../lib/utils';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }  
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-description-wrapper {
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.registerRoom.price);
  return (
    <Container>
      <h2>숙소 요금 설정하기</h2>
      <h3>10단계</h3>
      <Input
        label='기본요금'
        value={makeMoneyString(String(price || ''))}
        onChange={(e) => {       
          const input = e.target.value;
          if(!input) {
            dispatch(registerRoomActions.setPrice(0));
          }
          const numberPrice = Number(input.replace(/,/g,''));
          if(numberPrice) {
            dispatch(registerRoomActions.setPrice(numberPrice));
          }
}        }
      />
      <RegisterRoomFooter 
        prevHref='/room/register/title'
        nextHref='/room/register/date'
      />
    </Container>
  );
};

export default RegisterRoomPrice;
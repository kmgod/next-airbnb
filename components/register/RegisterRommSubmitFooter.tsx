import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import BackArrowIcon from '../../public/static/svg/register/register_room_footer_back_arrow.svg';
import Button from '../common/button/Button';
import palette from '../../styles/palette';
import { registerRoomAPI } from '../../lib/api/room';
import { useSelector} from '../../store';
import Link from 'next/link';

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerRoom = useSelector((state) => state.registerRoom);
  const router = useRouter();

  //* 등록하기 클릭 시
  const onClickRegisterRoom = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
      };
      try {
        await registerRoomAPI(registerRoomBody);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <Container>
      <Link href='/room/register/date'>
        <a className='register-room-footer-back'>
          뒤로
        </a>
      </Link>
      <Button onClick={onClickRegisterRoom}>등록하기
      </Button>
    </Container>
  );
};

export default React.memo(RegisterRoomSubmitFooter);

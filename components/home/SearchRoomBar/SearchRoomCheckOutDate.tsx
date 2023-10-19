import React from 'react';
import styled from 'styled-components';
import useSearchRoom from '../../../hooks/useSearchRoom';
import palette from '../../../styles/palette';
import DatePicker from '../../common/DatePicker';

const Container = styled.div`
  position: realtive;
  width: 100%;
  height: 70px;
  border: 2px solic transparent;
  border-radius: 12px;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  .search-room-bar-date-label {
    font-size: 10px;
    font-weight: 800;
    margin-bottom: 4px;
    position: absolute;
    z-index: 1;
    left: 20px;
    top: 16px;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 20px 0 0 20px;
    border: 0;
    border-radius: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  > div {
    width: 100%;
    height: 100%;
    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }
    .react-datepicker {
      display: flex;
    }
  }
`;

const SearchRoomCheckOutDate: React.FC = () => {
  const { checkInDate, checkOutDate, setCheckOutDateDispatch } = useSearchRoom();

  return (
    <Container>
      <div>
        <p className='search-room-bar-date-label'>체크아웃</p>
        <DatePicker
          selected={checkOutDate}
          monthsShown={2}
          onChange={(date) => setCheckOutDateDispatch(date as Date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          disabledKeyboardNavigation
          minDate={checkInDate}
          placeholderText='날짜추가'
        />
      </div>
    </Container>
  );
};
export default SearchRoomCheckOutDate;
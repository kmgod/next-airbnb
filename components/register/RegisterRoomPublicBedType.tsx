import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import RegisterButton from '../common/button/RegisterButton';
import { bedTypes } from '../../lib/staticData';
import Counter from '../common/Counter';
import palette from '../../styles/palette';
import { registerRoomActions } from '../../store/registerRoom';
import { useSelector } from '../../store';
import { BedType } from '../../types/room';
import Selector from '../common/selector/Selector';
import { pseudoRandomBytes } from 'crypto';

const Container = styled.li`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-public-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const publicBedList = useSelector(
    (state) => state.registerRoom.publicBedList
  );
  const dispatch = useDispatch();
  const totalBedsCount = useMemo(() => {
    let total =0;
    publicBedList.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedList]);
  const bedsText = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type}개`);
    return texts.join(',');
  }, [publicBedList]);

  const initialBedOptions = () => publicBedList.map((bed) => bed.type);
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(
    initialBedOptions
  )

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions, publicBedList]);
  return (
    <Container>
      <div className='register-room-bed-type-top'>
        <div>
          <p className='register-room-bed-type-bedroom'>공용공간</p>
          <p className='register-room-bed-type-bedroom-counts'>침대 {totalBedsCount}</p>
          <p>{bedsText}</p>
        </div>
        <RegisterButton onClick={() => setOpened(!opened)}>
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </RegisterButton>
      </div>
      {opened && (
        <div className='register-room-public-bed-type-counters'>
          {activedBedOptions.map((type) => (
            <div className='register-room-bed-type-counter' key={type}>
              <Counter 
                label={type}  
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) =>
                  dispatch(
                    registerRoomActions.setPublicBedTypeCount({
                      type,
                      count: value,
                    })
                  )
                }
              />
            </div>
          ))}
          <Selector 
            type='register'
            options={lastBedOptions}
            disabledOptions={["다른 침대 추가"]}
            value='다른 침대 추가'
            useValidation={false}
            onChange={(e) =>
              setActivedBedOptions([
                ...activedBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default React.memo(RegisterRoomPublicBedTypes);
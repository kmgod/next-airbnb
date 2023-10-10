import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import palette from '../../styles/palette';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import RadioGroup from '../common/RadioGroup';
import RegisterRoomFooter from './RegisterRoomFooter';
import Selector from '../common/selector/Selector';

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
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType
  );
  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const roomType = useSelector((state) => state.registerRoom.buildingType);
  const isSetupForGuest = useSelector(
    (state) => state.registerRoom.isSetUpForGuest
  );
  const dispatch = useDispatch();
  const setBuildingTypeDispatch = (selected: string) =>
    dispatch(registerRoomActions.setBuildingType(selected));
  
  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case '아파트': {
        const { apartmentBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(apartmentBuildingTypeList[0]);
        return apartmentBuildingTypeList;
      }
      case '주택': {
        const { houseBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(houseBuildingTypeList[0]);
        return houseBuildingTypeList;
      }
      case '별채': {
        const { secondaryBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(secondaryBuildingTypeList[0]);
        return secondaryBuildingTypeList;
      }
      case '독특한 숙소': {
        const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(uniqueSpaceBuildingTypeList[0]);
        return uniqueSpaceBuildingTypeList;
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(bnbBuildingTypeList[0]);
        return bnbBuildingTypeList;
      }
      case '부티크호텔': {
        const { boutiquesHotelBuildingTypeList } = require('../../lib/staticData');
        setBuildingTypeDispatch(boutiquesHotelBuildingTypeList[0]);
        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  const isValid = useMemo(() => {
    if(!largeBuildingType || !buildingType || !roomType || !isSetupForGuest) {
      return false;
    }
    return true;
  }, [largeBuildingType, buildingType, roomType, isSetupForGuest]);

  return (
    <Container>
      <h2>등록하실 속소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className='register-room-building-wrapper'>
        <Selector
          type='register'
          value={largeBuildingType || '하나를 선택해주세요'}
          onChange={(e) =>
            dispatch(registerRoomActions.setLargeBuildingType(e.target.value))
          }
          isValid={!!largeBuildingType}
          label='우선 범위를 좁혀볼까요?'
          disabledOptions={['하나를 선택해주세요']}
          options={[
            '하나를 선택해주세요',
            '아파트',
            '주택',
            '별채',
            '독특한 숙소',
            'B&B',
            '부티크호텔',
          ]}
        />
      </div>
      <div className='register=room-building-selector-wrapper'>
        <Selector 
          type='register'
          value={buildingType || ''}
          disabled={!largeBuildingType}
          onChange={(e) => setBuildingTypeDispatch(e.target.value)}
          isValid={!!buildingType}
          label='건물 유형을 선택하세요'
          options={detailBuildingOptions}
        />
      </div>
      {buildingType && (
        <>
          <div className='register-room-room-type-radio'>
            <RadioGroup 
              label='게스트가 묵게 될 숙소 유형을 골라주세요'
              value={roomType}
              isValid={!!roomType}
              onChange={(selected) => 
                dispatch(
                  registerRoomActions.setRoomType(
                    selected as 'entire' | 'private' | 'public'
                  )
                )
              }
              options={[
                {
                  label: '집전체',
                  value: 'entire',
                  description: '게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.',
                },
                {
                  label: '개인실',
                  value: 'private',
                  description: '게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.',
                },
                {
                  label: '다인실',
                  value: 'public',
                  description: '게스트는 개인 공간 없이 다른 사람과 함게 쓰는 침실이나 공용 공간에서 숙박합니다.',
                },
              ]}
            />
          </div>
          <div className='register-room-is-setup-for-guest-radio'>
            <RadioGroup 
              label='게스트만 사용하도록 만들어진 숙소인가요?'
              value={isSetupForGuest}
              isValid={isSetupForGuest !== null}  
              onChange={(value) => dispatch(registerRoomActions.setIsSetUpForGuest(value))}
              options={[
                {
                  label: '예, 게스트용으로 따로 마련된 숙소입니다.',
                  value: true,
                },
                {
                  label: '아니요, 제 개인 물건이 숙소에 있습니다.',
                  value: false,
                },
              ]}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter 
        isValid={isValid}  
        prevHref='/'
        nextHref='/room/register/bedrooms'
      />
    </Container>
  );
};

export default React.memo(RegisterRoomBuilding);
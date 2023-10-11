import React from 'react';
import { useSelector } from '../../store';
import RegisterRoomPublicBedType from './RegisterRoomPublicBedType';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className='register-room-bed-type-list'>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedType />

    </ul>
  );
};

export default React.memo(RegisterRoomBedList);
import styled from "styled-components";
import { useSelector } from "../../store";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  
`;

declare global {
  interface Window {
    google: any;
    iniMap: () => void;
  }
}

const  loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

interface IProps {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomListMap: React.FC<IProps> = ({ setShowMap }) => {
  const rooms = useSelector((state) => state.room.rooms);
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.5666784,
    longitude: 126.9778436,
  });

  const loadMap = async () => {
    await loadMapScript();
  }

  window.iniMap = () => {
    //* 지도 불러오기
    if(mapRef.current) {
      const map = new google.mapa.Map(mapRef.current, {
        center: {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        },
        zoom: 14,
      });
      rooms.forEach((room) => {
        const marker = new google.maps.Marker({
          position: { lat: room.latitude, lng: room.longitude },
          map,
        });
        console.log(marker);
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      () => {
        console.log('위치 받기 에러');
      }
    );
  }, []);

  useEffect(() => {
    loadMap();
  }, [rooms, currentLocation]);

  return (
    <>
      <Container>
        <div ref={mapRef} id='map' />
        <button 
          type='button'
          className="room-list-map-close-button"
          onClick={() => setShowMap(false)}
        />
      </Container>
    </>
  );
};

export default RoomListMap;



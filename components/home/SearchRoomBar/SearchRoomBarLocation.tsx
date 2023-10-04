import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { searchPlaceAPI, getPlaceAPI } from '../../../lib/api/map';
import useDebounce from '../../../hooks/useDebounce';
import palette from '../../../styles/palette';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom'
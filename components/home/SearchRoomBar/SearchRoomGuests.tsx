import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import Counter from '../../common/Counter';
import palette from '../../../styles/palette';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom';
import SearchRoomButton from './SearchRoomButton';


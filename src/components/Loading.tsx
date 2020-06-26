import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAni = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingRoot = styled.div<{ Color: string }>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${loadingAni} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) =>
      `${props.Color} transparent transparent transparent`};

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

interface LoadingProps {
  color?: string;
}

export default function Loading(props: LoadingProps) {
  return (
    <LoadingRoot Color={props.color || '#FFFFFF'}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingRoot>
  );
}

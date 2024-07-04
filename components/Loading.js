// components/Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ClipLoader size={50} />
  </div>
);

export default Loading;

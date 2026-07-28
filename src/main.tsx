import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ensureAudioUnlocked } from './audio';
import './tokens.css';

// 注册移动端音频解锁：首个用户手势时预热播放权限，使自动朗读在手机上也能出声
ensureAudioUnlocked();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

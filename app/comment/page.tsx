'use client';

import Script from 'next/script';

declare global {
  interface Window {
    twikoo: {
      init: (options: { envId: string; el: string }) => void;
    };
  }
}

export default function Comment() {
  return (
    <div className="min-h-screen">
      <div id="tcomment"></div>
      <Script
        src="https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.min.js"
        onReady={() => {
          window.twikoo.init({
            envId: 'https://twikoo.oneddd.com',
            el: '#tcomment',
          });
        }}
      />
    </div>
  );
}

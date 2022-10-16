import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import liveReload from 'vite-plugin-live-reload';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return { plugins: [react(), tsconfigPaths(), liveReload('./**/*.php'), svgr()] };
  } else {
    return {
      server: {
        https: {
          key: fs.readFileSync('./.cert/key.pem'),
          cert: fs.readFileSync('./.cert/cert.pem'),
        },
      },
      plugins: [react(), tsconfigPaths(), liveReload('./**/*.php'), svgr()],
    };
  }
});

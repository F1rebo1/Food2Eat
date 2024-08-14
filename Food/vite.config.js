import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     define: {
//       'process.env.PORT': env.PORT,
//       'process.env.MONGODB_URI': env.MONGODB_URI,
//       // If you want to exposes all env variables, which is not recommended
//       // 'process.env': env
//     },
//   };
// });
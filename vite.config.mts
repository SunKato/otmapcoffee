import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [tsconfigPaths(), zaloMiniApp(), react()],
    resolve: {
      alias: [
        { find: 'pages', replacement: '/src/pages' },
        { find: 'hooks', replacement: '/src/hooks.ts' },
        { find: 'components', replacement: '/src/components' },
        { find: 'state', replacement: '/src/state.ts' },
        { find: 'utils', replacement: '/src/utils' },
        { find: 'static', replacement: '/src/static' }
      ]
    }
  });
};

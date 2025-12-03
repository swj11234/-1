import { defineConfig } from "vite";
import uni from '@dcloudio/vite-plugin-uni';

export default  defineConfig({
    plugins: [uni()],
    server: {
        // "disableHostCheck": true,
        proxy: {
            "/api": {
                "target": "http://localhost:8088",
                "changeOrigin": true,
                "rewrite": (path)=> path.replace(/^\/api/,"")
            }
        }
    }
});
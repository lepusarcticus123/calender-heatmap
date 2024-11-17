import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "index.js", // 入口文件
      name: "Heatmap", // 库的全局变量名
      fileName: "heatmap", // 输出文件的文件名前缀
    },
    rollupOptions: {
      external: [], // 配置外部依赖项，例如lodash
      output: [
        {
          format: "umd", // UMD 格式
          dir: "dist", // 输出目录
          entryFileNames: "heatmap.umd.js", // UMD 输出文件名
          name: "CalenderHeatmap", // 全局变量名
          globals: {
            // 如果有外部依赖，可以在这里配置
            // lodash: '_',
          },
        },
        {
          format: "es", // ESM 格式
          dir: "dist", // 输出目录
          entryFileNames: "heatmap.esm.js", // ESM 输出文件名
        },
        {
          format: "cjs", // CommonJS 格式
          dir: "dist", // 输出目录
          entryFileNames: "heatmap.cjs.js", // CommonJS 输出文件名
        },
      ],
    },
    minify: true, // 启用压缩
    sourcemap: true, // 生成 sourcemap 文件
  },
});

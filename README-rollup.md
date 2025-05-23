# Rollup 打包配置

## 安装必要的依赖

首先需要安装Rollup的TypeScript插件：

```bash
npm install -D @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

或者使用pnpm：

```bash
pnpm add -D @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

## 配置文件说明

已创建的 `rollup.config.js` 配置文件包含：

- **输入文件**: `app.ts`
- **输出文件**: `dist/app.bundle.js`
- **输出格式**: ESM (ES模块)
- **插件**:
  - `@rollup/plugin-typescript`: 处理TypeScript文件
  - `@rollup/plugin-node-resolve`: 解析node_modules中的依赖
  - `@rollup/plugin-commonjs`: 转换CommonJS模块

## 使用方法

### 构建项目

```bash
npm run build
```

这将使用Rollup打包 `app.ts` 文件到 `dist/app.bundle.js`

### 运行打包后的文件

```bash
npm start
```

### 备用构建方法

如果需要使用TypeScript编译器：

```bash
npm run build:tsc
```

## 配置特点

- 将Node.js内置模块和外部依赖（如MCP SDK、zod）标记为外部依赖，不会打包进bundle
- 生成source map用于调试
- 使用ESM格式输出，适合现代Node.js环境

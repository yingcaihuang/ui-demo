# Expo UI Kit & Map Demo

A modern React Native demonstration app built with **Expo**, featuring advanced UI patterns, interactive data visualization, and high-performance animations.

## 📱 Features

### 1. 🗺️ Interactive China Heatmap
- **SVG-based Rendering**: High-performance vector map using `react-native-svg`.
- **Interactive**: Touch handling for individual provinces with visual feedback.
- **Data Visualization**: Heatmap coloring based on simulated population data.
- **Details Panel**: Slide-up cards showing detailed statistics for selected regions.

### 2. 🎨 Modern UI Kit
- **Glassmorphism**: "Liquid Glass" tab bar and card effects using `expo-blur`.
- **Native Components**:
    - User Profile Cards with badges.
    - E-commerce Product ScrollViews.
    - Settings Lists with toggle switches.
    - Styled Form Inputs.

### 3. ✨ Advanced Animations
Powered by **React Native Reanimated 3** and **Gesture Handler**:
- **3D Flip Cards**: Realistic card flipping with `rotateY` interpolation.
- **Accordion**: Smooth height transitions for expandable content.
- **Pulse Ripple**: Infinite radar-like looping animations.
- **Pan Gestures**: Draggable physics-based elements.
- **Layout Animations**: Auto-animating lists when adding/removing items.

## 🛠️ Tech Stack

- **Framework**: [Expo SDK 52+](https://expo.dev)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Animation**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Graphics**: [React Native SVG](https://github.com/software-mansion/react-native-svg)
- **Blur**: [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)
- **Data Mocking**: [Faker.js](https://fakerjs.dev/)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ui-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npx expo start
   ```

## 📂 Project Structure

```
├── app/
│   ├── (tabs)/          # Main tab navigation
│   │   ├── ui_demo.tsx  # UI Kit Showcase
│   │   ├── map.tsx      # SVG Heatmap
│   │   └── animation.tsx # Animation Gallery
│   └── _layout.tsx      # Root layout & Theme provider
├── components/          # Reusable UI components
├── constants/           # Theme & Map Data (SVG Paths)
└── hooks/               # Custom hooks (Theme, etc.)
```

## � Screenshots / 截图

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="public/426bcddb452acc6c938e798e51d732f2.png" width="30%" />
  <img src="public/45d792be3676f289fd2a175850bee463.png" width="30%" />
  <img src="public/6fbee040187185c6a393fd9e67ac0c82.png" width="30%" />
  <img src="public/8e901ff234b4608602050e7b1a846476.png" width="30%" />
  <img src="public/c89d83190575e424e45fcdc293e01448.png" width="30%" />
</div>

---

# Expo UI 组件库 & 地图演示 (中文版)

一个基于 **Expo** 构建的现代 React Native 演示应用，包含高级 UI 模式、交互式数据可视化和高性能动画。

## 📱 功能特性

### 1. 🗺️ 交互式中国热力图
- **SVG 渲染**: 使用 `react-native-svg` 实现的高性能矢量地图。
- **交互性**: 支持单个省份的触摸交互，提供视觉反馈。
- **数据可视化**: 基于模拟人口数据的热力图着色。
- **详细面板**: 底部弹出的滑动卡片，展示选中区域的详细统计数据。

### 2. 🎨 现代 UI 组件库
- **玻璃拟态**: 使用 `expo-blur` 实现的“液态玻璃”标签栏和卡片效果。
- **原生组件**:
    - 带徽章的用户资料卡片。
    - 电商产品滚动视图。
    - 带开关的设置列表。
    - 样式化表单输入。

### 3. ✨ 高级动画
由 **React Native Reanimated 3** 和 **Gesture Handler** 驱动：
- **3D 翻转卡片**: 使用 `rotateY` 插值实现的逼真卡片翻转。
- **手风琴效果**: 可展开内容的平滑高度过渡。
- **脉冲波纹**: 无限循环的雷达状波纹动画。
- **拖拽手势**: 基于物理的拖拽元素。
- **布局动画**: 添加/删除项目时的自动列表动画。

## 🛠️ 技术栈

- **框架**: [Expo SDK 52+](https://expo.dev)
- **路由**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **动画**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **图形**: [React Native SVG](https://github.com/software-mansion/react-native-svg)
- **模糊效果**: [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)
- **数据模拟**: [Faker.js](https://fakerjs.dev/)

## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone <your-repo-url>
   cd ui-demo
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **运行应用**
   ```bash
   npx expo start
   ```

## 📂 项目结构

```
├── app/
│   ├── (tabs)/          # 主标签导航
│   │   ├── ui_demo.tsx  # UI 组件库展示
│   │   ├── map.tsx      # SVG 热力图
│   │   └── animation.tsx # 动画画廊
│   └── _layout.tsx      # 根布局 & 主题提供者
├── components/          # 可复用 UI 组件
├── constants/           # 主题 & 地图数据 (SVG Paths)
└── hooks/               # 自定义 Hooks (主题等)
```

## �📄 License

This project is licensed under the MIT License.

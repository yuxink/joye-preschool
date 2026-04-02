# 佳宜幼小衔接 - 微信小程序版

专为6岁幼小衔接儿童设计的综合启蒙学习微信小程序，整合数学启蒙、拼音学习和英语启蒙三大核心模块。

## 功能特色

### 🔢 数学乐园
- 10以内/20以内加减法
- 拆数练习、相邻数、比大小
- 数列规律、生活应用题
- 错题自动收集与错题复习

### 🔤 拼音天地
- 韵母学习（单/复/前鼻/后鼻韵母）
- 声母学习（23个声母）
- 拼读训练（两拼法、三拼法）
- 完整拼音字母表

### 🔠 英语启蒙
- 单词闪卡（10大分类）
- 常用句型（问候、介绍、询问、请求）
- 本地离线发音

### 🎮 闯关模式（已完成）
- 三大难度关卡
- 按星级解锁下一关
- 自动记录最高星级

## 技术特点

### 离线语音系统
- 使用本地打包音频资源（`audio/english`、`audio/pinyin`、`audio/chinese`）
- 不依赖有道接口，不需要配置 TTS 域名
- 使用 `wx.createInnerAudioContext()` 播放音频

### 微信小程序特性
- 使用 `wx.setStorageSync/getStorageSync` 本地存储
- 使用 `wx.vibrateShort/Long` 震动反馈
- 使用 `wx.showModal/showToast` 交互提示

## 资源生成

项目包含脚本 `scripts/generate-assets.ps1`，用于生成：
- 本地离线发音资源（wav）
- 扁平化二维图标资源（`images/icons-flat`）

在 Windows PowerShell 中执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-assets.ps1
```

> 说明：脚本依赖系统语音能力（`System.Speech`），若机器无中文语音包，可先安装语言包后再执行。

## 项目结构

```text
joye-preschool-wx/
├── app.js
├── app.json
├── app.wxss
├── data/
├── pages/
├── utils/
│   ├── audio.js
│   ├── localAudioMap.js
│   └── questionGenerator.js
├── images/
│   ├── tabbar/
│   ├── icons/
│   └── icons-flat/
├── audio/
│   ├── english/
│   ├── pinyin/
│   └── chinese/
└── scripts/
    └── generate-assets.ps1
```

## 版本

v3.1.0

## 许可证

MIT License

---

用爱陪伴成长，用心启迪智慧 ❤️

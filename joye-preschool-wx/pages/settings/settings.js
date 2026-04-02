// 设置页面
const app = getApp()

Page({
  data: {
    settings: {},
    progress: {},
    accuracy: 0,
    wrongBookCount: 0,
    fontSizeOptions: [
      { value: 'small', label: '小' },
      { value: 'medium', label: '中' },
      { value: 'large', label: '大' }
    ],
    fontSizeIndex: 1,
    speedOptions: [
      { value: 'slow', label: '慢速' },
      { value: 'normal', label: '正常' },
      { value: 'fast', label: '快速' }
    ],
    speedIndex: 1
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const settings = app.globalData.settings
    const progress = app.globalData.progress
    const accuracy = app.getAccuracy()
    const wrongBookCount = app.globalData.wrongBook.length

    // 获取当前选中的索引
    const fontSizeIndex = this.data.fontSizeOptions.findIndex(
      item => item.value === settings.fontSize
    )
    const speedIndex = this.data.speedOptions.findIndex(
      item => item.value === settings.pinyinSpeed
    )

    this.setData({
      settings,
      progress,
      accuracy,
      wrongBookCount,
      fontSizeIndex: fontSizeIndex >= 0 ? fontSizeIndex : 1,
      speedIndex: speedIndex >= 0 ? speedIndex : 1
    })
  },

  // 切换音效
  toggleSound(e) {
    const soundEnabled = e.detail.value
    app.saveSettings({ soundEnabled })
    this.setData({
      'settings.soundEnabled': soundEnabled
    })
  },

  // 更改字体大小
  changeFontSize(e) {
    const index = e.detail.value
    const fontSize = this.data.fontSizeOptions[index].value
    app.saveSettings({ fontSize })
    this.setData({
      fontSizeIndex: index,
      'settings.fontSize': fontSize
    })
  },

  // 更改拼音语速
  changeSpeed(e) {
    const index = e.detail.value
    const pinyinSpeed = this.data.speedOptions[index].value
    app.saveSettings({ pinyinSpeed })
    this.setData({
      speedIndex: index,
      'settings.pinyinSpeed': pinyinSpeed
    })
  },

  // 清空错题本
  clearWrongBook() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空错题本吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          app.clearWrongBook()
          this.setData({ wrongBookCount: 0 })
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  },

  // 重置所有数据
  resetAllData() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有数据吗？包括学习记录、错题本等，此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          app.resetAllData()
          this.loadData()
          wx.showToast({ title: '已重置', icon: 'success' })
        }
      }
    })
  },

  // 显示关于
  showAbout() {
    wx.showModal({
      title: '关于佳宜幼小衔接',
      content: [
        '佳宜幼小衔接是一款专为6岁准小学生设计的综合启蒙学习应用，',
        '涵盖数学、拼音、英语三大学科，帮助孩子轻松完成幼小衔接，',
        '为小学学习打下坚实基础。',
        '',
        '🔢 数学乐园',
        '• 10/20以内加减法、混合运算',
        '• 数字分解与组合',
        '• 相邻数、比大小、数数',
        '• 生活应用题、数字规律',
        '• 闯关模式、错题本复习',
        '',
        '📖 拼音天地',
        '• 单韵母、复韵母、鼻韵母',
        '• 23个声母（含平翘舌）',
        '• 16个整体认读音节',
        '• 四声调学习与辨别',
        '• 两拼法、三拼法拼读训练',
        '• 拼音选字、字选拼音练习',
        '',
        '🌍 英语启蒙',
        '• 200+常用英语单词',
        '• 18个主题分类（动物、颜色、家庭等）',
        '• 单词闪卡学习',
        '• 10大类常用句型',
        '• 单词练习与测试'
      ].join('\n'),
      showCancel: false,
      confirmText: '知道了'
    })
  }
})

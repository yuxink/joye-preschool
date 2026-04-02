// 错题本页面
const app = getApp()

Page({
  data: {
    wrongBook: []
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const wrongBook = (app.globalData.wrongBook || []).map(item => ({
      ...item,
      typeName: this.getTypeName(item.type),
      addedTimeText: this.formatAddedTime(item.addedAt)
    }))
    this.setData({ wrongBook })
  },

  formatAddedTime(ts) {
    if (!ts) return '刚刚'
    const d = new Date(ts)
    const y = d.getFullYear()
    const m = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDate()}`.padStart(2, '0')
    const hh = `${d.getHours()}`.padStart(2, '0')
    const mm = `${d.getMinutes()}`.padStart(2, '0')
    return `${y}-${m}-${day} ${hh}:${mm}`
  },

  // 获取题型名称
  getTypeName(type) {
    const typeNames = {
      mixed10: '10以内加减',
      mixed20: '20以内加减',
      decompose: '拆数练习',
      adjacent: '相邻数',
      compare: '比大小',
      sequence: '数列规律',
      wordProblem: '应用题',
      multiply10: '乘法入门',
      division10: '除法入门',
      clockRead: '认识整点',
      moneyCount: '认识人民币',
      oddEven: '奇偶判断'
    }
    return typeNames[type] || '数学题'
  },

  // 移除错题
  removeItem(e) {
    const question = e.currentTarget.dataset.question
    wx.showModal({
      title: '确认移除',
      content: '确定要移除这道题吗？',
      success: (res) => {
        if (res.confirm) {
          app.removeWrongQuestion(question)
          this.loadData()
          wx.showToast({ title: '已移除', icon: 'success' })
        }
      }
    })
  },

  // 清空全部
  clearAll() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有错题吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearWrongBook()
          this.loadData()
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  },

  // 开始复习
  startReview() {
    if (this.data.wrongBook.length === 0) {
      wx.showToast({ title: '没有错题', icon: 'none' })
      return
    }
    
    // 跳转到数学练习页面进行复习
    wx.navigateTo({
      url: '/pages/math/practice/practice?mode=review'
    })
  }
})

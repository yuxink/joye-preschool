function getAudioKey(text) {
  if (!text) return 'audio'
  const normalized = String(text).toLowerCase()
  let result = ''
  let lastDash = false

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i]
    const code = normalized.charCodeAt(i)

    const isNum = code >= 48 && code <= 57
    const isAlpha = code >= 97 && code <= 122

    if (isNum || isAlpha) {
      result += ch
      lastDash = false
      continue
    }

    if (/[-_\s,.;:!?"'`~()\[\]{}<>/\\|]/.test(ch)) {
      if (!lastDash && result.length > 0) {
        result += '-'
        lastDash = true
      }
      continue
    }

    if (!lastDash && result.length > 0) {
      result += '-'
    }
    result += `u${code.toString(16).padStart(4, '0')}`
    lastDash = false
  }

  result = result.replace(/^-+|-+$/g, '')
  return result || 'audio'
}

function getLocalAudioPath(type, text) {
  return `/audio/${type}/${getAudioKey(text)}.wav`
}

module.exports = {
  getAudioKey,
  getLocalAudioPath
}


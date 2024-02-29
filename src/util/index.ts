export function addParamsToURL(
  url: any,
  params: {[s: string]: unknown} | ArrayLike<unknown>,
) {
  if (
    params &&
    Object.entries(params).length !== 0 &&
    params.constructor === Object
  ) {
    let temp = url
    let count = 0
    for (const [key, value] of Object.entries(params)) {
      temp += `${count === 0 ? '?' : '&'}${key}=${value}`
      count++
    }
    return temp
  }
  return url
}

export const getCapitalize = (word: string) => {
  const preSetter = word || ''
  return preSetter.toLowerCase().toUpperCase()
}

export function lightenColor(hex, percent) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // Convert RGB to HSL
  let hsl = rgbToHsl(r, g, b)

  // Adjust lightness
  hsl[2] = Math.min(100, hsl[2] + percent)

  // Convert HSL back to RGB
  const rgb = hslToRgb(hsl[0], hsl[1], hsl[2])

  // Convert RGB to hex
  const resultHex =
    '#' +
    Math.round(rgb[0]).toString(16).padStart(2, '0') +
    Math.round(rgb[1]).toString(16).padStart(2, '0') +
    Math.round(rgb[2]).toString(16).padStart(2, '0')

  return resultHex
}

export function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

export function hslToRgb(h, s, l) {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

// // Example: Lighten #8BC83F by 20%
// const lightenedColor = lightenColor('#8BC83F', 20)
// console.log(lightenedColor)

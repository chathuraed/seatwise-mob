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

/**
 * 获取浏览器语言
 * @returns {string}
 */
export function getLanguage() {
  return (navigator.language || navigator.browserLanguage).toLowerCase();
}

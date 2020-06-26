// eslint-disable-next-line import/prefer-default-export
export function getWinRect() {
  return {
    width: document.documentElement.offsetWidth,
    height: document.documentElement.offsetHeight,
    clientWidth: window.innerWidth,
    clientHeight: window.innerHeight,
  };
}

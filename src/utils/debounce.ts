function debounce(callback: (...args: unknown[]) => unknown, wait: number) {
  let timeoutId: number | undefined = undefined
  return (...args: unknown[]) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

export default debounce

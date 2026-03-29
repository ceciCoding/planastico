const MOBILE_BREAKPOINT = 768

export const useDevice = () => {
  const isMobile = ref(false)

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    isMobile.value = mql.matches

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches
    }

    mql.addEventListener('change', handler)
    onUnmounted(() => mql.removeEventListener('change', handler))
  })

  return { isMobile }
}

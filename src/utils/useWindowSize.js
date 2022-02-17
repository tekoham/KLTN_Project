import { useEffect, useState } from 'react'

export const useWindowSize = (innerWidth) => {
  let widthMobile = innerWidth || 575
  const [isMobile, setIsMobile] = useState(window.innerWidth < widthMobile)

  useEffect(() => {
    let windowResizeListener = window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < widthMobile)
    })

    return () => window.removeEventListener('resize', windowResizeListener)
  }, [widthMobile])

  return [isMobile]
}

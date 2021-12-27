import React, { useEffect } from 'react'
import { useElementScroll } from 'framer-motion'
import useNavigate, { ROUTE } from './useNavigate'

const withinRange = (a, b) => a > b - 5 && a < b + 5

const useCloseAtEnd = (ref) => {
  const navigate = useNavigate(ROUTE.home)
  const { scrollY } = useElementScroll(ref)

  useEffect(() => {
    const elm = ref.current as HTMLDivElement
    if (!elm) return

    const unsubscribe = scrollY.onChange(() => {
      console.log('scrolling')
      const height = elm.scrollHeight - window.innerHeight
      if (withinRange(scrollY.get(), height)) {
        navigate()
        unsubscribe()
      }
    })
  }, [])
}

export default useCloseAtEnd

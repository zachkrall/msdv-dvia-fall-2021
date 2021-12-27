import React from 'react'
import styled from 'styled-components'
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { css, cx } from '@emotion/css'

import DVIAGraphic from '../../assets/DVIA.svg?component'

import WebGL from './WebGL'

const styles = css`
  position: relative;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--accent);

  height: 50vh;
  max-height: 400px;

  svg {
    width: 30em;
    max-width: 100%;

    * {
      fill: #fff;
    }
  }
`

const Title = () => {
  const { scrollY } = useViewportScroll()
  const transform = useTransform(scrollY, (y) => 0 - y * 0.9)
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  return (
    <header className={cx(styles)}>
      <WebGL />
      <motion.div
        transition={{ duration: 0.8 }}
        style={{ y: spring, zIndex: 999 }}
      >
        <DVIAGraphic />
      </motion.div>
    </header>
  )
}

export default Title

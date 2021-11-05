import React from 'react'
import styled from 'styled-components'
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

const Spacer = styled.div`
  height: 100vh;
  width: 100vw;
`
const Wrapper = styled.div`
  background: #000;
  color: #fff;
  height: 100vh;
  position: fixed;
  width: 100vw;
  z-index: -1;

  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 11em;
    font-size: 3em;
    position: relative;
  }
  span {
    flex: 0 0 auto;
    margin: 0.1em;
    line-height: 0.75;
  }
`

const Title = () => {
  const { scrollY } = useViewportScroll() // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, (x) => 0 - x)
  const physics = { damping: 15, mass: 0.27, stiffness: 55 } // easing of smooth scroll
  const spring = useSpring(transform, physics) // apply easing to the negative scroll value

  return (
    <>
      <Wrapper>
        <motion.h1 style={{ y: spring }}>
          <span className="redaction-40">Data</span>
          <span className="redaction-30">Visualization</span>
          <span className="redaction-20">{'&'}</span>
          <span className="redaction-10">Information</span>
          <span className="redaction-0">Aesthetics</span>
        </motion.h1>
      </Wrapper>
      <Spacer> </Spacer>
    </>
  )
}

export default Title

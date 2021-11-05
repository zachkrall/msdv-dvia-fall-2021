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
        <div
          style={{
            position: 'absolute',
            // overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28,
          ].map((student) => {
            return (
              <motion.div
                key={student + 'box'}
                style={{
                  x:
                    (student / 28) * window.innerWidth +
                    window.innerWidth * Math.random() +
                    window.innerWidth,
                  y: Math.max(
                    100,
                    Math.random() * (window.innerHeight * Math.random() - 600)
                  ),
                  width: 50,
                  height: 50,
                  backgroundColor: `hsla(${(student / 28) * 360}, 50%, 50%, 1)`,
                }}
                animate={{
                  x: 0 - (student / 28) * window.innerWidth - 300,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5 * Math.random() + 5,
                }}
              ></motion.div>
            )
          })}
        </div>
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

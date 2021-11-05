import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  overflow: auto;

  width: 100vw;
  height: 100vh;

  padding: 5em 2em;

  z-index: 99999;
`

const Inner = styled(motion.div)`
  background: #fff;
  color: #000;

  max-width: 70em;
  padding: 2em;

  margin: 0 auto;
`

const AboutPage: React.FC<{}> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <Wrapper
      variants={{
        initial: {
          opacity: 0,
        },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
      }}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <button
        onClick={() => navigate('/')}
        style={{ padding: '1em', display: 'inline-block' }}
      >
        X
      </button>
      <Inner
        variants={{
          initial: {
            y: '10%',
          },
          enter: { y: 0 },
          exit: { y: '10%' },
        }}
        transition={{
          ease: 'easeInOut',
        }}
      >
        {children}
      </Inner>
    </Wrapper>
  )
}

export default AboutPage

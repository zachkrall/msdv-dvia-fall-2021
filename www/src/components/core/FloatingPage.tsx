import React from 'react'
import useNavigate, { ROUTE } from '../../hooks/useNavigate'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import FocusTrap from 'focus-trap-react'

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);

  overflow: auto;

  width: 100vw;
  height: 100vh;

  padding: 5em 2em 70vh 2em;

  z-index: 99999;

  backdrop-filter: blur(5px);
`

const Inner = styled(motion.div)`
  background: #fff;
  color: #000;

  max-width: 50em;

  margin: 0 auto;

  position: relative;

  img {
    max-width: 100%;
  }
`

const FloatingPage = React.forwardRef<any, any>(({ children }, ref) => {
  const navigate = useNavigate(ROUTE.home)

  return (
    <FocusTrap>
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
        onClick={(e: any) => {
          if (e.target === e.currentTarget) {
            navigate()
          }
        }}
        ref={ref}
      >
        <Inner
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: {
              y: '20px',
            },
            enter: { y: 0 },
            exit: { y: '20px' },
          }}
          transition={{
            ease: 'easeInOut',
          }}
        >
          <button
            onClick={() => navigate()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '0.5em 1em',
              display: 'inline-block',
              background: 'none',
              border: 0,
              color: '#000',
              fontSize: '2em',
              cursor: 'pointer',
            }}
            tabIndex={1}
          >
            &times;
          </button>
          {children}
        </Inner>
      </Wrapper>
    </FocusTrap>
  )
})

export default FloatingPage

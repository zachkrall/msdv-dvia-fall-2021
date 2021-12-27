import React from 'react'
import { css, cx } from '@emotion/css'
import * as icons from '@carbon/icons-react'
import ParsonsLogo from '../../assets/Parsons_Logo1_XL_KO.svg?component'
import { motion } from 'framer-motion'

const footer = css`
  --background: #000;
  --text: #bbb;
`

const container = css`
  padding: 5em 3em 3em 3em;

  background: var(--background);
  color: var(--text);

  h1 {
    color: #fff;
    border-bottom: 1px solid currentColor;
    margin-bottom: 0.5em;
    padding-bottom: 0.1em;
  }

  a {
    color: inherit;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`

const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  grid-gap: 2em;
`

const links = css`
  margin-top: 5em;
  padding-bottom: 3em;

  ul {
    display: inline-block;

    li {
      display: inline-block;
      margin-right: 1em;
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }

    svg {
      margin-right: 0.3em;
    }
  }
`

const Footer = () => {
  const FadeIn = ({ children, ...props }) => {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  const linkData = [
    [
      () => (
        <>
          <icons.LogoGithub16 /> Github
        </>
      ),
      'https://github.com/visualizedata',
    ],
    [
      () => (
        <>
          <icons.LogoTwitter16 /> Twitter
        </>
      ),
      'https://twitter.com/parsonsdataviz',
    ],
  ]

  return (
    <footer className={cx(footer)}>
      <div className={cx(container)}>
        <FadeIn className={cx(grid)}>
          <div
            className={cx(css`
              color: #fff;
              svg {
                max-width: 80%;
              }
            `)}
          >
            <ParsonsLogo />
          </div>
          <div>
            <h1>MS Data Visualization</h1>
            <h2>Parsons School of Design</h2>
            <p>Daniel Sauter, Program Director</p>

            <p style={{ marginTop: '0.5em' }}>
              <a href="https://parsons.nyc" rel={'noopener'}>
                parsons.nyc
              </a>
            </p>
            <p>
              <a href="https://www.newschool.edu/parsons/ms-data-visualization/" rel={'noopener'}>
                newschool.edu
              </a>
            </p>
            <h1 style={{ marginTop: '2em' }}>Data Visualization & Information Aesthetics</h1>
            <h2>Zach Krall (PGDV 5100)</h2>
            <h2>Ashley Treni (PSAM 5010)</h2>
          </div>
          <div>
            <h1>Credits</h1>
            <ul style={{ listStyle: 'none' }}>
              <li>Fonts: Redaction and Inter</li>
              <li>Tools: React, Vite, Framer Motion, Three.js, Notion</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn className={cx(links)}>
          <ul>
            {linkData.map(([Element, url]: any, index) => {
              return (
                <li key={url + index}>
                  <a href={url} rel={'noopener'}>
                    <Element />
                  </a>
                </li>
              )
            })}
          </ul>
        </FadeIn>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { css, cx } from '@emotion/css'

import Title from './Title'

const ProjectCard = ({ meta }) => {
  const url = '/projects/' + meta.id

  const styles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem 1.5rem;

    & > div {
      flex-grow: 1;
    }

    & > div + div {
      flex-grow: 0;
    }

    h1 {
      font-size: 2rem;
      line-height: 1 !important;
      padding-bottom: 0.2em;
      a:not(.arrow) {
        color: inherit;
        text-decoration: none;

        background: linear-gradient(to left, #eee 0%, #eee 100%);
        background-size: 0px 1px;
        background-repeat: no-repeat;
        background-position: 0% 100%;

        transition: background 0.6s ease;
      }
      a:not(.arrow):hover {
        background: linear-gradient(to left, #000 0%, #000 100%);
        background-repeat: no-repeat;
        background-size: 100% 1px;
        background-position: 0px 100%;
      }
    }

    a.arrow {
      display: inline-flex;
      width: 2em;
      height: 2em;
      align-items: center;
      justify-content: center;
      color: #000;
      border: 2px solid #000;
      border-radius: 999px;
      text-decoration: none;

      &:hover {
        background: #000;
        color: #fff;
      }
    }
  `

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 },
      }}
      className={cx(styles)}
    >
      <div>
        <h1 style={{ lineHeight: 1.8, maxWidth: '25em' }}>
          <Link to={url}>
            <Title>{meta.title}</Title>
          </Link>
        </h1>
        <h2>
          {meta.author.name} <span style={{ opacity: 0.4 }}>{meta.author.major}</span>
        </h2>

        {meta.tags.length > 0 && (
          <div style={{ padding: '1em 0', fontSize: '0.8em' }}>
            {meta.tags.map((i, index) => (
              <span key={i + index} style={{ padding: '0 0.5em 0 0', color: '#555' }}>
                #{i}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <Link to={url} className={'arrow'}>
          &rarr;
        </Link>
      </div>
    </motion.div>
  )
}

export default ProjectCard

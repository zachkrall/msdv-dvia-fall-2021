import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { css, cx } from '@emotion/css'

import FloatingPage from '../components/core/FloatingPage'
import Title from '../components/core/Title'
import ProjectContent from '../components/core/ProjectContent'

import useCloseAtEnd from '../hooks/useCloseAtEnd'

import { useGetDataQuery } from '../redux/api'

const projectHeader = css`
  margin: 2em 2em 0 2em;
  padding: 3em 0 2em 0;

  border-bottom: 1px solid #333;

  h1 {
    line-height: 1;
    max-width: 15em;
    padding-bottom: 0.5em;
    font-size: 2.5rem;
  }

  h2 {
    font-weight: 500;
  }
`
const Projects = () => {
  const history = useHistory()
  const params = useParams()
  const projectContainerRef = useRef<any>(null)

  useCloseAtEnd(projectContainerRef)

  if (params.projectId === undefined) {
    history.push('/')
    return null
  }

  const {
    data: page,
    all,
    isLoading,
  } = useGetDataQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      try {
        let selected = data.projects[params.projectId]
        return {
          data: selected,
          all: data,
          isLoading,
        }
      } catch (e) {
        return {
          data: undefined,
          all: data,
          isLoading,
        }
      }
    },
  })

  return (
    <FloatingPage ref={projectContainerRef}>
      {page !== undefined && (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <motion.div layoutId={params.id}>
              <div className={cx(projectHeader)}>
                <h1>
                  <Title>{page.meta.title}</Title>
                </h1>
                <h2>
                  {page.meta.author.name}{' '}
                  {page.meta.author.major && (
                    <span style={{ opacity: 0.4 }}>{page.meta.author.major}</span>
                  )}
                </h2>
              </div>

              <ProjectContent content={page.content} />
            </motion.div>
          )}
        </>
      )}

      {page === undefined && <div>Error!</div>}
    </FloatingPage>
  )
}

export default Projects

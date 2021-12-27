import { AnimatePresence, motion, useViewportScroll } from 'framer-motion'
import React from 'react'
import ProjectCard from '../components/core/ProjectCard'
import { css, cx } from '@emotion/css'

import { useGetDataQuery } from '../redux/api'

const ProjectList = React.memo<any>(({ projects }) => {
  const container = css`
    padding: 2em 1.5em;

    & > div:not(:last-child) {
      margin-bottom: 1em;
    }
  `

  const randomize = () => (Math.random() < 0.5 ? 1 : -1)

  return (
    <div className={cx(container)}>
      <AnimatePresence>
        {Object.values(projects)
          .sort(randomize)
          .map((project: any, index, arr) => (
            <ProjectCard {...project} key={project.meta.id} />
          ))}
      </AnimatePresence>
    </div>
  )
})

const IndexPage = () => {
  const [expand, setExpand] = React.useState(false)
  const { scrollY } = useViewportScroll()

  React.useEffect(() => {
    scrollY.onChange(() => {
      setExpand(scrollY.get() > 10)
    })
  }, [scrollY])

  const { data, error, isLoading } = useGetDataQuery(null)

  return (
    <div>
      <motion.div
        variants={{
          closed: { scale: 0.8, opacity: 0.9, filter: 'blur(15px)' },
          open: { scale: 1.0, opacity: 1.0, filter: 'blur(0px)' },
        }}
        transition={{
          ease: 'easeOut',
        }}
      >
        {data && !isLoading && <ProjectList projects={data.projects} />}
      </motion.div>
    </div>
  )
}

export default IndexPage

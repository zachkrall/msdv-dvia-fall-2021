import React from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import FloatingPage from '../components/FloatingPage'

const Projects = () => {
  const params = useParams()
  return (
    <FloatingPage>
      <motion.div layoutId={params.id}>
        <h1>Hello, World.</h1>
      </motion.div>
    </FloatingPage>
  )
}

export default Projects

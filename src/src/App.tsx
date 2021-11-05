import React from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'
import './styles/global.scss'

import NavBar from './components/NavBar'
import Title from './components/Title'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

/* pages */
import IndexPage from './routes/index'
const AboutPage = loadable(() => import('./routes/about'))
const Projects = loadable(() => import('./routes/projects'))

const App = () => {
  return (
    <AnimateSharedLayout type="crossfade">
      <HashRouter>
        <div>
          <NavBar />
          <Title />
          <IndexPage />

          <AnimatePresence>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects/:projectId" element={<Projects />} />
            </Routes>
          </AnimatePresence>
        </div>
      </HashRouter>
    </AnimateSharedLayout>
  )
}

export default App

import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route, useLocation } from 'react-router-dom'
import { store } from './redux/store'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout'
/* pages */
import IndexPage from './pages/index'
const Projects = React.lazy(() => import('./pages/projects'))

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  )
}

const Main = () => {
  const location = useLocation()
  return (
    <Suspense fallback={<>Loading...</>}>
      <Layout>
        <IndexPage />

        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/projects/:projectId" component={Projects} />
          </Switch>
        </AnimatePresence>
      </Layout>
    </Suspense>
  )
}

export default App

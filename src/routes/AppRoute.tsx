import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout.tsx'
import Home from '../pages/Home.tsx'
import PageNotFound from '../pages/PageNotFound.tsx'

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute

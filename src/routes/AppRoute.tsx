import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout.tsx'
import Home from '../pages/Home.tsx'

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute

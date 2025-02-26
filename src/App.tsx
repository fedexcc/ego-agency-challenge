import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.scss'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import Models from './components/Models'
import TechSpecs from './components/TechSpecs'

function App() {
  return (
    <Router>
      <TopBar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Models />} />
          <Route path="/modelos" element={<Models />} />
          <Route path="/modelos/ficha-tecnica/:id" element={<TechSpecs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App

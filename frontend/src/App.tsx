import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ParticipantForm from './pages/ParticipantForm'
import AnalyzePage from './pages/AnalyzePage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/participants/new" element={<ParticipantForm />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/results/:analysisId" element={<ResultsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App


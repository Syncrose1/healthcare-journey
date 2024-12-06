import './index.css'
import Adventure from './components/Adventure'

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-8 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <Adventure />
      </div>
    </div>
  )
}

export default App
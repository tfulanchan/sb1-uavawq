import React, { useState } from 'react'
import { Search, FileText } from 'lucide-react'
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/query', { query })
      setAnswer(response.data.answer)
    } catch (error) {
      console.error('Error fetching answer:', error)
      setAnswer('An error occurred while fetching the answer.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">RAG Document Q&A</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about the documents..."
              className="flex-grow p-2 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              <Search size={20} />
            </button>
          </div>
        </form>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : answer ? (
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="font-semibold mb-2 flex items-center">
              <FileText size={20} className="mr-2" />
              Answer:
            </h2>
            <p>{answer}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
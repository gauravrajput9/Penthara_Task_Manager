import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TasksPage from './components/TasksPage'

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<TasksPage />} />
    </Routes>
  )
}

export default App
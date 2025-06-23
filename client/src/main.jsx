import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router'
import './index.css'
import { 
  QueryClient, 
  QueryClientProvider 
} from '@tanstack/react-query';
import App from './App.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import TasksIndex from './pages/TasksIndex.jsx'

const queryClient = new QueryClient()
const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/tasks" element={<TasksIndex />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import system from './theme'
import JoinPage from './pages/Join'
import HomePage from './pages/Home'

const queryClient = new QueryClient()

function App() {

  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/join' element={<JoinPage />} />
            <Route path='/vote' />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App

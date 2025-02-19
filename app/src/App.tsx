import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'
import system from './theme'
import JoinPage from './pages/Join'
import HomePage from './pages/Home'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ApiContextProvider } from './ApiContextProvider'
import VotePage from './pages/VotePage'

const queryClient = new QueryClient()

function App() {

  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient} >
        <ApiContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/join' element={<JoinPage />} />
              <Route path='/vote' element={<VotePage />} />
            </Routes>
          </BrowserRouter>
        </ApiContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App

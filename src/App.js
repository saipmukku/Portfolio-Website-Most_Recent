import { Box } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main.js';
import SpacesDemo from './pages/SpacesDemo.js';

function App() {
  return (
    <Box 
      minH="100vh" 
      bg="bg.canvas"
      color="fg.default"
      fontFamily="body"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/spaces-demo" element={<SpacesDemo />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App;
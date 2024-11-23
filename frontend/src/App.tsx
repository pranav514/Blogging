// main.ts or index.tsx
// Or wherever your Tailwind CSS file is located
import { BrowserRouter ,Route , Routes } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogPost from './pages/BlogPost';


function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/blogpost' element = {<BlogPost/>} />
        </Routes>
      </BrowserRouter>
    )
}

export default App

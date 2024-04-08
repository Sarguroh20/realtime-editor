import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Main from './pages/Main';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <>
      <div>
        <Toaster
          position='top-right'
          // toastOptions={{
          //   success: { 
          //     iconTheme: {
          //       primary: 'linear-gradient(110.6deg, rgb(132, 55, 165) 6.3%, rgb(244, 48, 63) 61.7%, rgb(247, 121, 72) 90.6%)',
          //     }
          //   }
          // }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/editor/:roomId' element={<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from 'react';
import Layout from './components/Layout';
import { Routes, Route} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
// import { Homepage1 } from './pages/Homepage1';
import {Notfoundpage} from './pages/Notfoundpage';
import { Mainvideos } from './pages/Mainvideos';
import {Videos} from './pages/Videos';
// import { Videosidbar } from './pages/Videosidbar';

function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Homepage />} />
          <Route path="/videos" element={<Videos />} />
          <Route path='/mainvideos/:id' element={<Mainvideos/>} />
          {/* <Route path='/vidsb' element={<Videosidbar/>} /> */}
          <Route path='*' element={<Notfoundpage />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
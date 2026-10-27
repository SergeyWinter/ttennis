import React from 'react';
import Layout from './components/Layout';
import { Routes, Route} from 'react-router-dom';
// import { Homepage } from './pages/Homepage';
import { NewsHome } from './pages/NewsHome';
import { Equipment } from './pages/Equipment';
import {Notfoundpage} from './pages/Notfoundpage';
import { Mainvideos } from './pages/Mainvideos';
import {Videos} from './pages/Videos';
import { NewsPage } from './pages/NewsPage';
// import { Videosidbar } from './pages/Videosidbar';

function App() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* <Route index element={<Homepage />} /> */}
           <Route index element={<NewsHome />} />{/* Главная — новости */}
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/equipment" element={<Equipment />} />
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
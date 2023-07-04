import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import Audio from './Container/Audio';
import SortShowTutorial from './Container/SortWordsTutorial/SortShowTutorial';
import SortTutorial from './Container/SortTutorial';


function App() {




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<SortTutorial/>} />
            <Route path='/show' element={<SortShowTutorial/>} />
          </Route>
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;

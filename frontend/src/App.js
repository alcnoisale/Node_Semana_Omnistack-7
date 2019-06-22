import React from 'react';
import { BrowserRouter } from 'react-router-dom';

//MEUS COMPONENTES CRIADOS
import Header from './components/Header';
import Routes from './routes';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;

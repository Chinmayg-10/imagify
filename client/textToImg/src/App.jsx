import './App.css'
import {Routes,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { BuyCredit } from './pages/BuyCredit';
import { Nav } from './components/Navigation';


import { useContext } from 'react';
import { AppContext } from './context/state';
import { ToastContainer } from 'react-toastify';
import { Login } from './components/Login';
import { Footer } from './components/Footer';


function App(){
  const{showLogin}=useContext(AppContext);
  return(
    <div className='flex flex-col px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Nav/>
      {showLogin && <Login/>}
      <main className='flex-grow px-4 sm:px-10 md:px-14 lg:px-28'>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      </main>
      <Footer/>
    </div>
  );
}
export default App;
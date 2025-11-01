import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar';
import Adminsignin from './components/Adminsignin';
import DisplayAlldata from './components/DisplayAlldata';
import Updateuser from './components/Updateuser';
import Adduser from './components/Adduser';
import { AppProvider } from './utils/UseContextApp';

function App() {
  return (
  <AppProvider>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route  path='/adminsignin' element={<Adminsignin/>}/>
        <Route  path='/displayuser' element={<DisplayAlldata/>}/>
        <Route  path='/updateuser/:user_id' element={<Updateuser/>}/>
        <Route  path='/adduser' element={<Adduser/>}/>
      </Routes>
   </BrowserRouter>
  </AppProvider>
  );
}

export default App;

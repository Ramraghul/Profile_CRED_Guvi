import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/EditProfile/:id' element={<ProfileEdit/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

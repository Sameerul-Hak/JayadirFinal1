// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Routes,Route, BrowserRouter} from 'react-router-dom';
import Login from './Components/Login/Login';
import Events from './Components/Events/Events';
import CreateEvent from './Components/Create/CreateEvent';
import Main from './Components/Qrcode/Main'
import CertificateGenerator from './Components/Certificate/CertificateGenerator';
import Attendance from './Components/Attendance/Attendance';
import Register from './Components/Register/Register';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/createevent' element={<CreateEvent/>}/>
      <Route path='/createcertificate/:name' element={<CertificateGenerator/>}/>
      <Route path='/qrcode/:eventId' element={<Main />} />
      <Route path='/attendance/:eventId' element={<Attendance />} />
    </Routes>
    </Router>

  );
}

export default App;

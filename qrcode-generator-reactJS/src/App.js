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
import Student from './Components/Register/Student';
import Teacher from './Components/Register/Teacher';
import Others from './Components/Register/Others';
import CertificateLogin from './Components/Login/CertificateLogin';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/createevent' element={<CreateEvent/>}/>
      <Route path='/createcertificate/:name/:eventid' element={<CertificateGenerator/>}/>
      <Route path='/qrcode/:eventname/:who' element={<Main />} />
      <Route path='/attendance/:eventName' element={<Attendance />} />
      <Route path='/:eventname/Student' element={<Student />} />
      <Route path='/:eventname/Teacher' element={<Teacher />} />
      <Route path='/:eventname/Others' element={<Others />} />
      <Route path='/certificateLoging' element={<CertificateLogin />} />
    </Routes>
    </Router>

  );
}

export default App;

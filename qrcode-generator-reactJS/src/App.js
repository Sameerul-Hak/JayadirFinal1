// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Routes,Route, BrowserRouter} from 'react-router-dom';
import Login from './Components/Login/Login';
import Events from './Components/Events/Events';
import CreateEvent from './Components/Create/CreateEvent';
import Main from './Components/Qrcode/Main'
import CertificateGenerator from './Components/Certificate/CertificateGenerator';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/createevent' element={<CreateEvent/>}/>
      <Route path='/createcertificate/:name' element={<CertificateGenerator/>}/>
      <Route path='/qrcode/:eventId' element={<Main />} />
    </Routes>
    </Router>

  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import ClientLogin from './components/Login.js';
import ClientUpload from './components/Upload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLogin/>} />
        <Route path="/login" element={<ClientLogin/>} />
        <Route path="/upload" element={<ClientUpload/>} />
        {/* <Route path="main" element={<Main/>} /> */}
      </Routes>
    </div>
  );
}

export default App;

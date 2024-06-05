import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import SignIn from './views/auth/SignIn';
function App() {
  return (
    <Router>
      <Routes>
        <Route   path="/login"  element={<SignIn/>} />
      </Routes> 
    </Router>
  );
}

export default App;

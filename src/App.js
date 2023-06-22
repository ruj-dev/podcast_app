import Header from './components/Header';
import './App.css';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignInSignUp/>}/>

          

        </Routes>
     
      </Router>
    </div>
  );
}

export default App;

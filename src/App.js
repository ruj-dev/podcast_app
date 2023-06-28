import './App.css';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import Profile from "./pages/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from './pages/PrivateRoute';
import CreateAPodcast from './pages/CreateAPodcast';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
       if (user) {
         const unsubscribeSnapshot = onSnapshot(
           doc(db, "users", user.uid),
           (userDoc) => {
             if (userDoc.exists()) {
               const userData = userDoc.data();
               dispatch(
                 setUser({
                   name: userData.name,
                   email: userData.email,
                   uid: user.uid,
                 })
               );
             }
           },
           (error) => {
             console.error("Error fetching user data:", error);
           }
         );

         return () => {
           unsubscribeSnapshot();
         };
       }
     });

     return () => {
       unsubscribeAuth();
     };
  }, [])
  
  return (
    <div className="App">
      <ToastContainer />
      <Router>   
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

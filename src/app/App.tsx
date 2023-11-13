import { FC, Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./styles/index.scss"

import { auth } from "../firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import Header from "../shared/header";



const MainPage = lazy(() => import("../pages/MainPage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))
const RegisterPage = lazy(() => import("../pages/RegisterPage"))
const BoardPage = lazy(() => import("../pages/BoardPage"))


const App: FC = () => {


  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const LOGIN = "/login"
  const REGISTER = "/register"

  const shouldHideHeader = location.pathname === LOGIN || location.pathname === REGISTER;


  const handleSingOut = () => {
    signOut(auth).catch(error => console.log(error))
    navigate("/")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)

    })
    return unsubscribe;
  }, [])



  return (
    <div className="app">
      {!shouldHideHeader && <Header handleSingOut={handleSingOut} user={user} />}
      <Suspense fallback='loading'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage user={user} />} />
          <Route path={`/${user?.displayName?.split(' ').join('')}`} element={<ProfilePage user={user} />} />
          <Route path="/register" element={<RegisterPage user={user} />} />
          <Route path={`/boards`} element={<BoardPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

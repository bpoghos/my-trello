import { FC, Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./styles/index.scss"

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "../shared/Header";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { HideHeader } from "../shared/constant/constant";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getPost } from "../redux/slices/postSlice";



const MainPage = lazy(() => import("../pages/MainPage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))
const RegisterPage = lazy(() => import("../pages/RegisterPage"))
const BoardPage = lazy(() => import("../pages/BoardPage"))
const HomePage = lazy(() => import("../pages/HomePage"))
const Workspace = lazy(() => import("../pages/Workspace"))




const App: FC = () => {

  const user = useSelector((state: RootState) => state.user.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const shouldHideHeader = location.pathname === HideHeader.LOGIN || location.pathname === HideHeader.REGISTER;


  const handleSingOut = () => {
    signOut(auth).catch(error => console.log(error))
    navigate("/")
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      dispatch(logOut(currentUser))
    })
    return unsubscribe;
  }, [])





  return (
    <div className="app">
      {!shouldHideHeader && <Header handleSingOut={handleSingOut} user={user} />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <MainPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={user ? <BoardPage /> : <MainPage />} />
          <Route path="/boards" element={<BoardPage />} />
          <Route path="/login" element={user ? <Navigate to={"/home"} replace /> : <LoginPage user={user} />} />
          <Route path="/register" element={user ? <Navigate to={"/home"} replace /> : <RegisterPage user={user} />} />
          <Route path={`/${user?.displayName?.split(' ').join('')}`} element={<ProfilePage user={user} />} />
          <Route path={`/workspace/:title`} element={<Workspace />} />
          <Route path={`/workspace/:title/:taskId`} element={<Workspace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

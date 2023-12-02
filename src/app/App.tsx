import { FC, Suspense, lazy, useEffect, useState } from "react";
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
import { getWorkspaceData } from "../redux/thunks/workspaceThunk";
import Modal from "../shared/Modal";



const MainPage = lazy(() => import("../pages/MainPage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))
const RegisterPage = lazy(() => import("../pages/RegisterPage"))
const BoardPage = lazy(() => import("../pages/BoardPage"))
const HomePage = lazy(() => import("../pages/HomePage"))
const WorkspacePage = lazy(() => import("../pages/WorkspacePage"))




const App: FC = () => {

  const user = useSelector((state: RootState) => state.user.profile)
  const UserDispatch = useDispatch()
  const DataDisputch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const photos = [
    { id: 1, name: 'photo1', imageUrl: "https://wallpapersmug.com/download/2880x1800/26df45/forest-fog-tree-nature-montana.jpg" },
    { id: 2, name: 'photo2', imageUrl: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg" },
    { id: 3, name: 'photo3', imageUrl: "https://wallpapersmug.com/download/2880x1800/e235f6/cloudy-day-metropolis-city.jpg" },
    { id: 4, name: 'photo4', imageUrl: "https://s3.us-west-1.wasabisys.com/ft-backgrounds/-mreflowMatt_Wolfe_a_colorful_digital_background_477e314c-c8c2-4491-88d5-1194cd417006.jpeg" }
  ]




  const shouldHideHeader = location.pathname === HideHeader.LOGIN || location.pathname === HideHeader.REGISTER;
  const [searchVal, setSearchVal] = useState<string>('')

  const handleSingOut = () => {
    signOut(auth).catch(error => console.log(error))
    navigate("/")
  }

  useEffect(() => {
    DataDisputch(getWorkspaceData())
  }, [DataDisputch])


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      UserDispatch(logOut(currentUser))
    })
    return unsubscribe;
  }, [UserDispatch])


  return (
    <div className="app">



      {!shouldHideHeader && <Header handleSingOut={handleSingOut} setSearchVal={setSearchVal} photos={photos} />}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <MainPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={user ? <BoardPage searchVal={searchVal} /> : <MainPage />} />
          <Route path="/boards" element={<BoardPage searchVal={searchVal} />} />
          <Route path="/login" element={user ? <Navigate to={"/boards"} replace /> : <LoginPage user={user} />} />
          <Route path="/register" element={user ? <Navigate to={"/boards"} replace /> : <RegisterPage user={user} />} />
          <Route path={`/${user?.displayName?.split(' ').join('')}`} element={<ProfilePage user={user} />} />
          <Route path={`/workspace/:id`} element={<WorkspacePage searchVal={searchVal} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

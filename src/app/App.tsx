import { FC, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./styles/index.scss"

import { auth } from "../firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import Header from "../shared/Header";
import { ProcessProps, TaskProps, WorkspaceProps } from "./App.interface";
import Loading from "../components/Loading";


const MainPage = lazy(() => import("../pages/MainPage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))
const RegisterPage = lazy(() => import("../pages/RegisterPage"))
const BoardPage = lazy(() => import("../pages/BoardPage"))
const HomePage = lazy(() => import("../pages/HomePage"))
const Workspace = lazy(() => import("../pages/Workspace"))
const TaskPage = lazy(() => import("../pages/TaskPage"))



const App: FC = () => {


  const [user, setUser] = useState<User | null>(null)

  const task: TaskProps[] = [
    {
      id: '1',
      title: "New Todo",
      description: "You must finish your todo next week",
      comments: [
        {
          id: '1',
          author: {
            profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
            name: "Mike",
            surname: "Vazovski",
            comment: "I will do that!",
            date: "12.08.2023"
          },
          replies: [
            {
              id: '1',
              profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
              name: "Mike",
              surname: "Vazovski",
              reply: "OK, I will wait you!!!",
              date: "14.08.2023"

            },
            {
              id: '2',
              profilePhoto: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
              name: "Lily",
              surname: "Showner",
              reply: "OK, I will wait you!!!",
              date: "15.08.2023"

            }
          ]
        },
        {
          id: '2',
          author: {
            profilePhoto: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
            name: "John",
            surname: "Vazovski",
            comment: "I will do that!",
            date: "18.08.2023"

          },
          replies: [
            {
              id: '1',
              profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
              name: "Mike",
              surname: "Vazovski",
              reply: "OK, I will wait you!!!",
              date: "20.08.2023"

            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: "Task",
      description: "You must finish your todo next week",
      comments: [
        {
          id: '1',
          author: {
            profilePhoto: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
            name: "John",
            surname: "Johnyan",
            comment: "I will do that!",
            date: "21.08.2023"

          },
          replies: [
            {
              id: '1',
              profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
              name: "Mike",
              surname: "Vazovski",
              reply: "OK, I will wait you!!!",
              date: "22.08.2023"

            }
          ]
        }
      ]
    }
  ]

  const process: ProcessProps[] = [
    {
      title: "Todo",
      data: task
    },
    {
      title: "Doing",
      data: []
    },
    {
      title: "In testing",
      data: []
    },
    {
      title: "Done",
      data: []
    },

  ]


  const workspace: WorkspaceProps[] = [
    {
      title: "firstWorkSpace",
      processes: process
    },
    {
      title: "secondWorkSpace",
      processes: []
    }
  ]


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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <MainPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={user ? <BoardPage workspace={workspace} /> : <MainPage />} />
          <Route path="/boards" element={<BoardPage workspace={workspace} />} />
          <Route path="/login" element={user ? <Navigate to={"/home"} replace /> : <LoginPage user={user} />} />
          <Route path="/register" element={user ? <Navigate to={"/home"} replace /> : <RegisterPage user={user} />} />
          <Route path={`/${user?.displayName?.split(' ').join('')}`} element={<ProfilePage user={user} />} />
          <Route path={`/workspace/:title`} element={<Workspace workspace={workspace} />} />
          <Route path={`/workspace/:title/:id`} element={<TaskPage task={task} user={user} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

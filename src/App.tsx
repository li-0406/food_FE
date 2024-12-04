import { useRoutes } from "react-router-dom"
import "./App.css"
import routes from "./routes"
import Header from "./components/Header"

function App() {
  const element = useRoutes(routes)
  return (
    <div className="relative flex flex-col w-full min-h-screen App">
      <header className="z-20">
        <Header />
      </header>
      <div className="w-44">{/* <img className="h-24 w-44" src="/loading.gif" alt="" /> */}</div>
      <main className="page-wrapper">{element}</main>
    </div>
  )
}

export default App

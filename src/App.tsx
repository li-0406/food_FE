import { useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import Header from "./components/Header";

function App() {
  const element = useRoutes(routes);
  return (
    <div className="App relative flex min-h-screen w-full flex-col">
      <header className="z-20">
        <Header />
      </header>
      <main className="page-wrapper">{element}</main>
    </div>
  );
}

export default App;

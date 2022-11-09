import "./App.css";
import Home from "./Home";
import { UseFirebaseValue } from "./Firebase";
import Login from "./components/Login";

function App() {
  const [{ user }] = UseFirebaseValue();
  return <>{!user ? <Login /> : <Home />}</>;
}

export default App;

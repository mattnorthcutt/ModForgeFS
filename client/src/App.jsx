import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.css";
import "./styles/builds.css";
import "./styles/mods-and-forms.css";
import { tryGetLoggedInUser } from "../managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "../components/NavBar";
import ApplicationViews from "../components/ApplicationViews";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  return (
    <div className="app-shell">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

      <main className="main-content">
        <ApplicationViews
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      </main>
    </div>
  );
}

export default App;

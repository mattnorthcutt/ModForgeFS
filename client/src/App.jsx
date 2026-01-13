import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.css";
import "./styles/builds.css";
import "./styles/mods-and-forms.css";
import "./styles/navbar.css"
import { tryGetLoggedInUser } from "../managers/authManager";
import { Spinner } from "reactstrap";
import NavBar from "../components/NavBar";
import ApplicationViews from "../components/ApplicationViews";
import { getMyProfile } from "../managers/profileManager";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);

      if (user) {
        getMyProfile().then(setMyProfile).catch(() => setMyProfile(null))
      } else {
        setMyProfile(null)
      }
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  return (
    <div className="app-shell">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} myProfile={myProfile}/>

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

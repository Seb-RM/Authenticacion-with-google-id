// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  console.log(user.name);
  console.log(user.picture);

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "147871023345-b0oq82hsko9ve3tqgusiepkj142ull7l.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt()
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {
        Object.keys(user).length !=0 &&
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {user && (
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;

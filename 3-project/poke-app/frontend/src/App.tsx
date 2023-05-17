import React, { useState, createContext } from "react";
import './App.css'
import { LoginForm } from './forms'
import { Footer } from './footer'
import { Header } from "./header"

// User context with default values for setting User data
export const SetUserContext = createContext({
  setLoggedInUser: (user: string) => {},
  setLoggedInUserId: (id: number) => {},
})

// Context for getting data about user
export const UserContext = createContext({ user: "", id: -1 })

function App() {
  const [user, setLoggedInUser] = useState("")
  const [id, setLoggedInUserId] = useState(-1)
  const newSetUserContext = { setLoggedInUser, setLoggedInUserId }
  const newGetUserContext = { user, id }

  return (
    <div className="App">
      <Header/>
      {/* Set Usercontext for LoginForm overriding default values  */}
      <SetUserContext.Provider value={newSetUserContext}>
          <LoginForm/>
      </SetUserContext.Provider>
      <p>{user} with id {id}</p>
      <Footer />
    </div>
  );
}

export default App;

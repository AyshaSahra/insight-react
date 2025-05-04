import HomePage from "./components/pages/HomePage"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProfilePage from "./components/pages/ProfilePage"
import SearchPage from "./components/pages/SearchPage"

function App() {
  
  return (
    <div className="bg-[#F4F5F8] overflow-y-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App

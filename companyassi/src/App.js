import "./App.css";
import { Routes, Route } from "react-router-dom";
import Userinfo from "./Components/Userinfo/Userinfo";
import Loginpage from "./Components/Loginpage/Loginpage";
import Homepage from "./Components/Home/Homepage";

import Sidenav from "./Components/Dashboard/Dashboard";
import UserData from "./Components/Userinfo/UserData";
import ProjectData from "./Components/ProjectData/ProjectData";
import Depopage from "./Components/Depo/Depopage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Loginpage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/userinfo" element={<Userinfo />} />
        <Route path="/projectinfo" element={<ProjectData />} />
        <Route path="/userinfo/:ID" element={<UserData />} />
        <Route path="/depopage" element={<Depopage />} />
      </Routes>
    </div>
  );
}

export default App;

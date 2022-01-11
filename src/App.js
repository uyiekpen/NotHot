import Header from "./Component/Header"
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Register from "./Component/Register";
import Sigin from "./Component/Sigin";
import CreatePost from "./Component/CreatePost";
import HomeScreen from "./Component/HomeScreen";
import ImageDetail from "./Component/ImageDetail";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header/>
    </div>
    <Routes>
    <Route path="/" element={<HomeScreen/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/signin" element={<Sigin/>}/>
      <Route path="/create" element={<CreatePost/>}/>
      <Route path="/:id" element={<ImageDetail/>}/>



      
    </Routes>
    </BrowserRouter>
  );
}

export default App;

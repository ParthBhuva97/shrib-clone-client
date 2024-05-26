import Note from "./Components/Note"
import { Routes , Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Note />}></Route>
    <Route path="/:id" element={<Note />}></Route>
    </Routes>    
  )
}

export default App

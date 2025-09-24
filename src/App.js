
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6">
      <UserTable
        users={filteredUsers.slice((page - 1) * limit, page * limit)}
        onEdit={(u) => navigate(`/edit/${u.id}`, { state: u })}
        onDelete={handleDelete}
      />
      <Pagination total={filteredUsers.length} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default UsersPage;

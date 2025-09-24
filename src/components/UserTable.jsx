import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const data = res.data.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        company: u.company.name
      }));
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  
  const handleEditSubmit = async (form) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, form);
      setUsers(users.map(u => u.id === editingUser.id ? { ...form, id: u.id } : u));
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  
  const handleAddSubmit = async (form) => {
    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", form);
      setUsers([...users, { ...form, id: res.data.id || users.length + 1 }]);
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert("Add user failed");
    }
  };

  
  let displayed = [...users].filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.company.toLowerCase().includes(search.toLowerCase())
  );

  if (sortKey) {
    displayed.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  
  const totalPages = Math.ceil(displayed.length / limit);
  displayed = displayed.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={() => setAdding(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add User
        </button>
      </div>

      {(adding || editingUser) && (
        <UserForm
          initialData={editingUser}
          onSubmit={adding ? handleAddSubmit : handleEditSubmit}
          onCancel={() => { setAdding(false); setEditingUser(null); }}
        />
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl mt-4">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => { setSortKey("id"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>ID</th>
              <th className="p-3 cursor-pointer" onClick={() => { setSortKey("name"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>Name</th>
              <th className="p-3">Username</th>
              <th className="p-3 cursor-pointer" onClick={() => { setSortKey("email"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>Email</th>
              <th className="p-3 cursor-pointer" onClick={() => { setSortKey("company"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>Department</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.company}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setEditingUser(u)}
                    className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      <div className="flex justify-between mt-4 items-center">
        <div>
          <span>Rows per page: </span>
          <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }} className="border p-1 rounded">
            {[5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}





import React, { useState, useEffect } from "react";

export default function UserForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    company: ""
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-3 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold">{initialData ? "Edit User" : "Add User"}</h2>
      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full rounded" required />
      <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="border p-2 w-full rounded" required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full rounded" required />
      <input type="text" placeholder="Department" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="border p-2 w-full rounded" required />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{initialData ? "Save" : "Add"}</button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
      </div>
    </form>
  );
}

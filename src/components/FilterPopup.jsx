import { useState } from "react";

const FilterPopup = ({ onFilter }) => {
  const [filters, setFilters] = useState({ firstName: "", lastName: "", email: "", department: "" });

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="p-4 border rounded shadow bg-white">
      {["firstName", "lastName", "email", "department"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={filters[field]}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
      ))}
      <button onClick={() => onFilter(filters)} className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
    </div>
  );
};

export default FilterPopup;

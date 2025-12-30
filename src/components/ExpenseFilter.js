import { useState } from "react";

export default function ExpenseFilters({ onFilter }) {
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [search, setSearch] = useState("");
const CATEGORY_OPTIONS = [
  "Food",
  "Travel",
  "Rent",
  "Shopping",
  "Bills",
  "Entertainment",
  "Medical",
  "Education",
  "Groceries",
  "Others",
];

  const applyFilter = () => {
    onFilter({ category, month, search });
  };

  return (
    <div className="d-flex gap-2 mb-3">

 <select
  className="form-control"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>

  {CATEGORY_OPTIONS.map((c, i) => (
    <option key={i} value={c}>{c}</option>
  ))}
</select>


      <input
        type="month"
        className="form-control"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <input
        className="form-control"
        placeholder="Search description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn btn-primary" onClick={applyFilter}>
        Filter
      </button>
    </div>
  );
}

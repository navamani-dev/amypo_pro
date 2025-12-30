import ExpenseFilters from "./ExpenseFilter";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

export default function FilterPage() {
  const [filters, setFilters] = useState({
    category: "",
    month: "",
    search: "",
  });
const { expenses } = useSelector(state => state.expense);
const user = useSelector(state => state.user.currentUser);
const navigate = useNavigate();


const monthlyTotal = useMemo(() => {
  if (!user) return 0;

  //filter with date || category || description
  return expenses
    .filter(e => e.userId === user.id)
    .filter(e => !filters.month || e.date.startsWith(filters.month))
    .filter(e => !filters.category || e.category === filters.category)
    .filter(
      e =>
        !filters.search ||
        (e.description &&
          e.description.toLowerCase().includes(filters.search.toLowerCase()))
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);
}, [expenses, filters, user]);


  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">
        <h4>Filter Expenses</h4>
{filters.month && (
  <div className="alert alert-info">
    <strong>
      Monthly Total On{" "}
      {filters.category ? `(${filters.category})` : "(All Categories)"} :
    </strong>{" "}
    ₹{monthlyTotal}
  </div>
)}

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <ExpenseFilters onFilter={setFilters} />

<ExpenseList
  filters={filters}
  enableEdit={true}
/>
    </div>
  );
}

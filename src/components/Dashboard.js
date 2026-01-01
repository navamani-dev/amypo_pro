import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { useMemo, useState } from "react";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

export default function Dashboard() {
  const [editData, setEditData] = useState(null);
  const clearEdit = () => setEditData(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);
  const expenses = useSelector((state) => state.expense.expenses);

  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const totalThisMonth = useMemo(() => {
    if (!user) return 0;

    return expenses
      .filter((e) => e.userId === user.id)
      .filter((e) => e.date && e.date.startsWith(thisMonth))
      .reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses, user, thisMonth]);

  //return
  if (!isLoggedIn || !user) {
    return <Navigate to="/" />;
  }

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const today = new Date().toDateString();

  return (
    <div className="vh-100 d-flex flex-column">
      <nav className="navbar navbar-light bg-light px-4 shadow-sm">
        <h4>Expense Tracker</h4>

        <div className="d-flex gap-4 align-items-center">
          <strong>₹ {totalThisMonth} (This Month)</strong>
          <span>{today}</span>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/filters")}
          >
            Filter
          </button>
          <h4>Name : {user.name}</h4>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          <div className="col-md-4 border-end">
            <div style={{ position: "sticky", top: "80px" }}>
              <AddExpense editData={editData} clearEdit={clearEdit} />
            </div>
          </div>

          <div className="col-md-8 overflow-auto p-3">
            <ExpenseList
              filters={{ category: "", month: "", search: "" }}
              setEditData={setEditData}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

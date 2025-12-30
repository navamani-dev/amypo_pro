import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../store/ExpenseSlice";

export default function AddExpense({ editData, clearEdit }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.currentUser);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const getToday = () => new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(getToday());

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

  useEffect(() => {
    if (editData) {
      setAmount(editData.amount);
      setCategory(editData.category);
      setDate(editData.date);
      setDesc(editData.description);
    }
  }, [editData]);

  const submit = (e) => {
    e.preventDefault();

    const data = {
      id: editData ? editData.id : Date.now(),
      userId: user.id,
      amount,
      category,
      date,
      description: desc,
    };

    editData ? dispatch(updateExpense(data)) : dispatch(addExpense(data));

    clearEdit?.();
    setAmount("");
    setCategory("");
    setDesc("");
  };

  return (
    <form onSubmit={submit} className="p-3 shadow rounded mb-4">
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="form-control mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>

        {CATEGORY_OPTIONS.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="form-control mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="btn btn-success w-100">
        {editData ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "../store/ExpenseSlice";
import { useState } from "react";

export default function ExpenseList({ filters = {}, enableEdit = false }) {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const user = useSelector((state) => state.user.currentUser);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  if (!user) return null;

  const userExpenses = expenses
    .filter((e) => e && e.userId === user.id)
    .filter(
      (e) =>
        !filters.category ||
        e.category?.toLowerCase().includes(filters.category.toLowerCase())
    )
    .filter((e) => !filters.month || e.date?.startsWith(filters.month))
    .filter(
      (e) =>
        !filters.search ||
        e.description?.toLowerCase().includes(filters.search.toLowerCase())
    );

  const startEdit = (e) => {
    setEditId(e.id);
    setEditForm({
      amount: e.amount,
      category: e.category,
      date: e.date,
      description: e.description,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const update = () => {
    dispatch(
      updateExpense({
        ...editForm,
        id: editId,
        userId: user.id,
      })
    );
    setEditId(null);
  };

  return (
    <>
      <h5>My Expenses</h5>

      {userExpenses.map((e) => (
        <div key={e.id} className="border rounded p-3 mb-2">
          {editId === e.id ? (
            <>
              <input
                className="form-control mb-2"
                value={editForm.amount}
                onChange={(ev) =>
                  setEditForm({ ...editForm, amount: ev.target.value })
                }
              />

              <select
                className="form-control mb-2"
                value={editForm.category}
                onChange={(ev) =>
                  setEditForm({ ...editForm, category: ev.target.value })
                }
              >
                <option>Food</option>
                <option>Rent</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Medical</option>
                <option>Education</option>
                <option>Groceries</option>
                <option>Others</option>
              </select>

              <input
                type="date"
                className="form-control mb-2"
                value={editForm.date}
                onChange={(ev) =>
                  setEditForm({ ...editForm, date: ev.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editForm.description}
                onChange={(ev) =>
                  setEditForm({ ...editForm, description: ev.target.value })
                }
              />

              <button className="btn btn-success me-2" onClick={update}>
                Update
              </button>
              <button className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>₹{e.amount}</strong>  |  {e.category}  |  {e.description}
                <div className="text-muted small">{e.date}</div>
              </div>

              <div>
                {enableEdit && (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => startEdit(e)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteExpense(e.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

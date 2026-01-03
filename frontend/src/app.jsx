import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API = "http://localhost:3000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  // READ
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };

  // CREATE
  const addBook = async () => {
    await axios.post(API, {
      ...form,
      publishedYear: Number(form.publishedYear),
      availableCopies: Number(form.availableCopies)
    });
    setForm({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: ""
    });
    fetchBooks();
  };

  // UPDATE (increase / decrease copies)
  const updateCopies = async (id, change) => {
    await axios.put(`${API}/${id}`, { change });
    fetchBooks();
  };

  // DELETE (only if copies = 0)
  const deleteBook = async (id, copies) => {
    if (copies !== 0) {
      alert("Cannot delete book with available copies");
      return;
    }
    await axios.delete(`${API}/${id}`);
    fetchBooks();
  };

  return (
    <div className="container">
      <h2>Library Book Management</h2>

      {/* CREATE */}
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Author" onChange={e => setForm({ ...form, author: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Year" onChange={e => setForm({ ...form, publishedYear: e.target.value })} />
      <input placeholder="Copies" onChange={e => setForm({ ...form, availableCopies: e.target.value })} />
      <button onClick={addBook}>Add Book</button>

      <hr />

      {/* READ + UPDATE + DELETE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Copies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.availableCopies}</td>
              <td>
                <button onClick={() => updateCopies(b._id, 1)}>+</button>
                <button onClick={() => updateCopies(b._id, -1)}>-</button>
                <button onClick={() => deleteBook(b._id, b.availableCopies)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

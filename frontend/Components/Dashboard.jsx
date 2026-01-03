import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:3000/books");
    setBooks(res.data);
  };

  const addBook = async () => {
    await axios.post("http://localhost:3000/books", form);
    fetchBooks();
  };

  const deleteBook = async (id, copies) => {
    if (copies !== 0) return alert("Copies not zero");
    await axios.delete(`http://localhost:3000/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <h2>Library CRUD</h2>

      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Author" onChange={e => setForm({ ...form, author: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Year" onChange={e => setForm({ ...form, publishedYear: e.target.value })} />
      <input placeholder="Copies" onChange={e => setForm({ ...form, availableCopies: e.target.value })} />
      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map(b => (
          <li key={b._id}>
            {b.title} ({b.availableCopies})
            <button onClick={() => deleteBook(b._id, b.availableCopies)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

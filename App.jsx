import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [form, setForm] = useState({ name: '', regno: '', cgpa: '0.0', dept: '' })
  const [students, setStudents] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveStudent = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:8000/savestudent', form)
    alert(res.data.message)
    setForm({ name: '', regno: '', cgpa: '0.0', dept: '' })
  }

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:8000/getstudents')
    setStudents(res.data)
  }

  return (
    <div>
      <h1>Save Student</h1>
      <form onSubmit={saveStudent}>
        {['name', 'regno', 'cgpa', 'dept'].map((field) => (
          <div key={field}>
            <label>{field.toUpperCase()}:</label>
            <input
              type={field === 'regno' || field === 'cgpa' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>

      <br />
      <button onClick={fetchStudents}>View Students</button>

      <h2>All Students</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Regno</th><th>CGPA</th><th>Dept</th></tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td><td>{s.regno}</td><td>{s.cgpa}</td><td>{s.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App

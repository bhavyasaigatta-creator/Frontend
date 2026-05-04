import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("https://portfolio-otyf.onrender.com/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.techStack) {
      alert("Please fill all fields");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `https://portfolio-otyf.onrender.com/projects/${editId}`
      : "https://portfolio-otyf.onrender.com/projects";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(() => {
      fetchProjects();
      setForm({ title: "", description: "", techStack: "" });
      setEditId(null);
    });
  };

  const deleteProject = (id) => {
    fetch(`https://portfolio-otyf.onrender.com/projects/${id}`, {
      method: "DELETE"
    })
    .then(() => fetchProjects());
  };

  const editProject = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack
    });
    setEditId(project._id);
  };

 return (
  <div style={{ fontFamily: "Segoe UI", background: "#eef2f7", minHeight: "100vh", padding: "30px" }}>
    
    <h1 style={{ textAlign: "center", color: "#222" }}>
      🚀 My Portfolio
    </h1>

    <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
      A full-stack MERN project to manage and showcase my work
    </p>

    <div style={{
      maxWidth: "600px",
      margin: "auto",
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          style={{ padding: "10px", margin: "8px", width: "80%", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ padding: "10px", margin: "8px", width: "80%", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          name="techStack"
          placeholder="Tech Stack"
          value={form.techStack}
          onChange={handleChange}
          style={{ padding: "10px", margin: "8px", width: "80%", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <br />

        <button
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            background: editId ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>

    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "30px"
    }}>

      {projects.length === 0 && (
        <p>No projects added yet</p>
      )}

      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            background: "white",
            borderRadius: "12px",
            margin: "15px",
            padding: "20px",
            width: "260px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease"
          }}
        >
          <h2 style={{ color: "#007bff" }}>{p.title}</h2>
          <p style={{ color: "#555" }}>{p.description}</p>
          <p><b>{p.techStack}</b></p>

          <button
            onClick={() => editProject(p)}
            style={{
              marginTop: "10px",
              marginRight: "10px",
              padding: "8px 12px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteProject(p._id)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>

  </div>
);
}

export default App;
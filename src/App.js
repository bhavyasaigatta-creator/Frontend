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
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      
      <h1 style={{ textAlign: "center", color: "#333" }}>
        My Portfolio
      </h1>

      <p style={{ textAlign: "center", color: "#666" }}>
        A full-stack MERN project to manage and showcase my work
      </p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            style={{ padding: "10px", margin: "5px", width: "220px" }}
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ padding: "10px", margin: "5px", width: "220px" }}
          />

          <input
            name="techStack"
            placeholder="Tech Stack"
            value={form.techStack}
            onChange={handleChange}
            style={{ padding: "10px", margin: "5px", width: "220px" }}
          />

          <br />

          <button
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              background: editId ? "green" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            {editId ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

        {projects.length === 0 && (
          <p style={{ textAlign: "center" }}>No projects added yet</p>
        )}

        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              background: "white",
              borderRadius: "10px",
              margin: "15px",
              padding: "20px",
              width: "260px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
              cursor: "pointer"
            }}
          >
            <h2 style={{ color: "#007bff" }}>{p.title}</h2>
            <p>{p.description}</p>
            <p><b>{p.techStack}</b></p>

            <button
              onClick={() => editProject(p)}
              style={{
                marginTop: "10px",
                marginRight: "10px",
                padding: "8px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteProject(p._id)}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px"
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
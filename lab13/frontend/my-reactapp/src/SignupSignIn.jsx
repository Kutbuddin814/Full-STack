import { useState } from 'react';

function SignupSignIn() {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollno:'',
    marks:'',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [marks, setMarks] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const marksStatus = e.target.value;
   
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
     setMarks(marksStatus) 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
      } else {
        setMessage(data.message || "Signup successful!");
        setFormData({ name: '', class: '', rollno:'', marks:'' }); // clear form on success
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">name:</label><br />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter your name"
            required
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="class">Class:</label><br />
          <input
            type="text"
            name="class"
            onChange={handleChange}
            value={formData.class}
            placeholder="Enter your Class"
            required
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="marks">Roll no:</label><br />
          <input
            type="text"
            name="rollno"
            onChange={handleChange}
            value={formData.rollno}
            placeholder="Enter your Roll no"
            required
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="rollno">Marks:</label><br />
          <select name ="marks" style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }} onChange={handleChange}>
            <option value="1">Full Stack</option>
            <option  value="2">Internet Technology</option>
            <option  value="3">Cloud Computing</option>
            <option  value="4">UI/UX</option>
          </select>
        </div>
        <input
          type="submit"
          disabled={loading}
          value={loading ? "Submitting..." : "Submit"}
          style={{
            width: '100%',
            padding: '0.7rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        />
      </form>
      {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default SignupSignIn;


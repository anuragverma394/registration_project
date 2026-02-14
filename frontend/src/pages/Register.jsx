import { useState } from "react";
import { validateRegister } from "../utils/validators";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(form);

      alert(data.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        userType: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          margin: 0;
          background: #f2f4f8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .page {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          width: 380px;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        h2 {
          text-align: center;
          color: #2d89ff;
          margin-bottom: 20px;
        }

        input, select {
          width: 100%;
          border: none;
          border-bottom: 2px solid #e0e0e0;
          padding: 10px 5px;
          margin-top: 14px;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
          background: transparent;
        }

        input:focus, select:focus {
          border-bottom-color: #2d89ff;
        }

        .radio-group {
          margin-top: 18px;
          font-size: 14px;
        }

        .radio-group label {
          margin-right: 15px;
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }

        button {
          width: 100%;
          border: none;
          padding: 12px;
          border-radius: 25px;
          background: linear-gradient(90deg, #2d89ff, #00c9a7);
          color: white;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 22px;
        }

        button:hover {
          opacity: 0.9;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h2>Registration Form</h2>

          <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.name} onChange={handleChange("name")} />
            {errors.name && <div className="error">{errors.name}</div>}

            <input placeholder="Email" value={form.email} onChange={handleChange("email")} />
            {errors.email && <div className="error">{errors.email}</div>}

            <input placeholder="Phone" value={form.phone} onChange={handleChange("phone")} />
            {errors.phone && <div className="error">{errors.phone}</div>}

            {/* DOB */}
            <input type="date" value={form.dob} onChange={handleChange("dob")} />
            {errors.dob && <div className="error">{errors.dob}</div>}

            {/* Gender */}
            <div className="radio-group">
              <strong>Gender:</strong><br />
              <label>
                <input type="radio" value="Male" checked={form.gender === "Male"} onChange={handleChange("gender")} />
                Male
              </label>
              <label>
                <input type="radio" value="Female" checked={form.gender === "Female"} onChange={handleChange("gender")} />
                Female
              </label>
              <label>
                <input type="radio" value="Other" checked={form.gender === "Other"} onChange={handleChange("gender")} />
                Other
              </label>
            </div>
            {errors.gender && <div className="error">{errors.gender}</div>}

            {/* User Type */}
            <select value={form.userType} onChange={handleChange("userType")}>
              <option value="">Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
            </select>
            {errors.userType && <div className="error">{errors.userType}</div>}

            <input type="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
            {errors.password && <div className="error">{errors.password}</div>}

            <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

            <button disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


import { useState } from "react";
//import { validateRegister } from "../utils/validators";
import { registerUser } from "../services/api";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    userType: "",
    course: "",
    password: "",
    confirmPassword: "",
    qualifications: []
  });

  const [qualificationInput, setQualificationInput] = useState({
    qualification: "",
    year: "",
    percentage: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleQualificationInputChange = (field) => (e) =>
    setQualificationInput({
      ...qualificationInput,
      [field]: e.target.value
    });

  const addQualification = () => {
    const { qualification, year, percentage } = qualificationInput;

    if (!qualification || !year || !percentage) {
      alert("Fill qualification details");
      return;
    }

    setForm({
      ...form,
      qualifications: [...form.qualifications, qualificationInput]
    });

    setQualificationInput({ qualification: "", year: "", percentage: "" });
  };

  const removeQualification = (index) => {
    setForm({
      ...form,
      qualifications: form.qualifications.filter((_, i) => i !== index)
    });
  };

  const editQualification = (index) => {
    setQualificationInput(form.qualifications[index]);
    setEditIndex(index);
  };

  const updateQualification = () => {
    const updated = [...form.qualifications];
    updated[editIndex] = qualificationInput;

    setForm({ ...form, qualifications: updated });
    setQualificationInput({ qualification: "", year: "", percentage: "" });
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await registerUser(form);
      alert(data.message);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #eef3f6;
          font-family: Arial, sans-serif;
          color: #2c3e50;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          padding: 20px 40px;
        }

        .form-container {
          background: white;
          border: 1px solid #cfd8dc;
          padding: 20px;
        }

        .header {
          font-size: 18px;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid #b0bec5;
          color: #00695c;
        }

        .section-title {
          font-size: 13px;
          margin: 15px 0 8px;
          padding-bottom: 4px;
          border-bottom: 1px solid #d0d7dc;
          color: #00695c;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 8px 12px;
        }

        label {
          font-size: 11px;
          display: flex;
          flex-direction: column;
        }

        input, select {
          margin-top: 3px;
          padding: 5px;
          font-size: 12px;
          border: 1px solid #b0bec5;
          background: #f9fbfc;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #00695c;
          background: white;
        }

        .button-row {
          margin-top: 10px;
        }

        button {
          font-size: 11px;
          padding: 5px 10px;
          border: 1px solid #90a4ae;
          background: #eceff1;
          cursor: pointer;
          margin-right: 6px;
        }

        button:hover {
          background: #dfe6ea;
        }

        .submit-btn {
          margin-top: 15px;
          background: #00695c;
          color: white;
          border: none;
          padding: 7px 16px;
        }

        .submit-btn:hover {
          background: #004d40;
        }

        .qual-box {
          border: 1px solid #cfd8dc;
          background: #f9fbfc;
          padding: 6px;
          font-size: 11px;
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      <div className="page">
        <div className="form-container">
          <div className="header">Application / Registration Form</div>

          <form onSubmit={handleSubmit}>

            <div className="section-title">Personal Details</div>
            <div className="grid">
              <label>
                Full Name
                <input value={form.name} onChange={handleChange("name")} />
              </label>

              <label>
                Email Address
                <input value={form.email} onChange={handleChange("email")} />
              </label>

              <label>
                Phone Number
                <input value={form.phone} onChange={handleChange("phone")} />
              </label>

              <label>
                Date of Birth
                <input type="date" value={form.dob} onChange={handleChange("dob")} />
              </label>
            </div>

            <div className="section-title">Academic Details</div>
            <div className="grid">
              <label>
                User Type
                <select value={form.userType} onChange={handleChange("userType")}>
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </label>

              <label>
                Course Applied
                <select value={form.course} onChange={handleChange("course")}>
                  <option value="">Select</option>
                  <option value="CS">Computer Science</option>
                </select>
              </label>
            </div>

            <div className="section-title">Qualifications</div>
            <div className="grid">
              <label>
                Qualification
                <select
                  value={qualificationInput.qualification}
                  onChange={handleQualificationInputChange("qualification")}
                >
                  <option value="">Select</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Graduation">Graduation</option>
                </select>
              </label>

              <label>
                Year
                <input
                  value={qualificationInput.year}
                  onChange={handleQualificationInputChange("year")}
                />
              </label>

              <label>
                Percentage
                <input
                  value={qualificationInput.percentage}
                  onChange={handleQualificationInputChange("percentage")}
                />
              </label>
            </div>

            <div className="button-row">
              <button
                type="button"
                onClick={editIndex !== null ? updateQualification : addQualification}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>

            {form.qualifications.map((q, i) => (
              <div key={i} className="qual-box">
                <span>[{i + 1}] {q.qualification} - {q.year} - {q.percentage}%</span>
                <span>
                  <button type="button" onClick={() => editQualification(i)}>Edit</button>
                  <button type="button" onClick={() => removeQualification(i)}>Remove</button>
                </span>
              </div>
            ))}

            <div className="section-title">Security</div>
            <div className="grid">
              <label>
                Password
                <input type="password" value={form.password} onChange={handleChange("password")} />
              </label>

              <label>
                Confirm Password
                <input type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} />
              </label>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}


// import { useState } from "react";
// import { jsPDF } from "jspdf";
// import { registerUser } from "../services/api";
// //import { validateRegister } from "../utils/validators";


// export default function Register() {

//   const currentYear = new Date().getFullYear();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     collegeName: "",
//     course: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     qualifications: [],
//     declaration: false
//   });
  
//  const [qualificationInput, setQualificationInput] = useState({
//     collegeName: "",
//     course: "",
//     year: "",
//     percentage: ""
//   });

//   const [editIndex, setEditIndex] = useState(null);
//   const [loading, setLoading] = useState(false);   // ✅ FIXED

//   const handleChange = (field) => (e) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;

//     setForm(prev => ({ ...prev, [field]: value }));
//   };

//   const handleQualificationInputChange = (field) => (e) =>
//     setQualificationInput(prev => ({
//       ...prev,
//       [field]: e.target.value
//     }));

//   const validateYear = (year) => {
//     const y = Number(year);
//     return y >= 1960 && y <= currentYear;
//   };

//   const addQualification = () => {
//     const { collegeName, course, year, percentage } = qualificationInput;

//     if (!collegeName || !course || !year || !percentage) {
//       alert("Fill all qualification details");
//       return;
//     }

//     if (!validateYear(year)) {
//       alert(`Year must be between 1990 and ${currentYear}`);
//       return;
//     }

//     if (Number(percentage) > 100) {
//       alert("Percentage cannot exceed 100");
//       return;
//     }

//     setForm(prev => ({
//       ...prev,
//       qualifications: [...prev.qualifications, qualificationInput]
//     }));

//     // ✅ Clear fields after add
//     setQualificationInput({
//       collegeName: "",
//       course: "",
//       year: "",
//       percentage: ""
//     });
//   };

//   const removeQualification = (index) => {
//     setForm(prev => ({
//       ...prev,
//       qualifications: prev.qualifications.filter((_, i) => i !== index)
//     }));
//   };

//   const editQualification = (index) => {
//     setQualificationInput(form.qualifications[index]);
//     setEditIndex(index);
//   };

//   const updateQualification = () => {

//     if (!validateYear(qualificationInput.year)) {
//       alert(`Year must be between 1990 and ${currentYear}`);
//       return;
//     }

//     if (Number(qualificationInput.percentage) > 100) {
//       alert("Percentage cannot exceed 100");
//       return;
//     }

//     setForm(prev => {
//       const updated = [...prev.qualifications];
//       updated[editIndex] = qualificationInput;

//       return { ...prev, qualifications: updated };
//     });

//     // ✅ Clear & exit edit mode
//     setQualificationInput({
//       collegeName: "",
//       course: "",
//       year: "",
//       percentage: ""
//     });

//     setEditIndex(null);
//   };

  
// const validateForm = () => {
//   const errors = {};
//   const { name, email, phone, dob, gender, address, city, state, pincode, password, confirmPassword, qualifications } = form;

//   if (!name) {
//     errors.name = "Name is required";
//   } else if (!/^[A-Za-z\s]+$/.test(name)) {
//     errors.name = "Name cannot contain numbers or special characters";
//   }

//   if (!email) {
//     errors.email = "Email is required";
//   } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//     errors.email = "Invalid email format";
//   }

//   if (!phone) {
//     errors.phone = "Phone number is required";
//   } else if (!/^[0-9]{10}$/.test(phone)) {
//     errors.phone = "Phone must be exactly 10 digits";
//   }

//   if (!dob) {
//     errors.dob = "Date of Birth is required";
//   }

//   if (!gender) {
//     errors.gender = "Please select gender";
//   }

//   if (!address) {
//     errors.address = "Address is required";
//   }

//   if (!city) {
//     errors.city = "City is required";
//   }

//   if (!state) {
//     errors.state = "State is required";
//   }

//   if (!pincode) {
//     errors.pincode = "Pincode is required";
//   } else if (!/^[0-9]{6}$/.test(pincode)) {
//     errors.pincode = "Pincode must be 6 digits";
//   }

//   if (!password) {
//     errors.password = "Password is required";
//   } else if (
//     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
//   ) {
//     errors.password =
//       "Password must contain uppercase, lowercase, number & special character";
//   }

//   if (!confirmPassword) {
//     errors.confirmPassword = "Confirm Password is required";
//   } else if (password !== confirmPassword) {
//     errors.confirmPassword = "Passwords do not match";
//   }

//   if (!qualifications.length) {
//     errors.qualifications = "Add at least one qualification";
//   }

//   return errors;
// };


//   const exportPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(14);
//     doc.text("Application Form", 20, 20);

//     doc.setFontSize(11);
//     doc.text(`Name: ${form.name}`, 20, 35);
//     doc.text(`Email: ${form.email}`, 20, 45);
//     doc.text(`Phone: ${form.phone}`, 20, 55);
//     doc.text(`DOB: ${form.dob}`, 20, 65);
//     doc.text(`Gender: ${form.gender}`, 20, 75);

//     doc.text("Address:", 20, 90);
//     doc.text(`${form.address}`, 20, 100);
//     doc.text(`${form.city}, ${form.state} - ${form.pincode}`, 20, 110);

//     doc.text("Qualifications:", 20, 130);

//     let y = 140;

//     form.qualifications.forEach((q, i) => {
//       doc.text(
//         `[${i + 1}] ${q.collegeName} - ${q.course} - ${q.year} - ${q.percentage}%`,
//         20,
//         y
//       );
//       y += 10;
//     });

//     doc.save("application-form.pdf");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       alert("Please fix the errors: " + Object.values(formErrors).join(", "));
//       return;
//     }

//     if (!form.declaration) {
//       alert("Please accept declaration");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await registerUser(form);

//       alert(data.message);

//     } catch (err) {
//       alert(err.message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           margin: 0;
//           background: #eef3f6;
//           font-family: Arial, sans-serif;
//         }

//         .page {
//           padding: 20px 40px;
//         }

//         .form-container {
//           background: white;
//           border: 1px solid #cfd8dc;
//           padding: 20px;
//         }

//         .header {
//           font-size: 18px;
//           border-bottom: 1px solid #b0bec5;
//           padding-bottom: 6px;
//           color: #00695c;
//         }

//         .section-title {
//           font-size: 13px;
//           margin: 15px 0 8px;
//           border-bottom: 1px solid #d0d7dc;
//           color: #00695c;
//         }

//         .grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 8px 12px;
//         }

//         input, select, textarea {
//           padding: 6px;
//           font-size: 12px;
//           border: 1px solid #b0bec5;
//           background: #f9fbfc;
//         }

//         button {
//           font-size: 11px;
//           padding: 6px 12px;
//           margin-top: 10px;
//           cursor: pointer;
//         }

//         .qual-box {
//           border: 1px solid #cfd8dc;
//           padding: 6px;
//           font-size: 11px;
//           margin-top: 6px;
//           display: flex;
//           justify-content: space-between;
//         }

//         .gender-row {
//           display: flex;
//           gap: 20px;
//           font-size: 12px;
//           margin-top: 8px;
//         }

//         .declaration {
//           display: flex;
//           align-items: center;
//           margin-top: 14px;
//           font-size: 12px;
//         }

//         .checkbox-box {
//           width: 16px;
//           height: 16px;
//           border: 1px solid black;
//           margin-right: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//         }

//         .submit-btn {
//           background: #00695c;
//           color: white;
//           border: none;
//         }

//         .pdf-btn {
//           background: #2d89ff;
//           color: white;
//           border: none;
//           margin-left: 10px;
//         }
//       `}</style>

//       <div className="page">
//         <div className="form-container">
//           <div className="header">Application / Registration Form</div>

//           <form onSubmit={handleSubmit}>

//             <div className="section-title">Personal Details</div>
//             <div className="grid">
//               <input placeholder="Full Name" value={form.name} onChange={handleChange("name")} />
//               <input placeholder="Email (Gmail)" value={form.email} onChange={handleChange("email")} />
//               <input placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} />
//               <input type="date" value={form.dob} onChange={handleChange("dob")} />
//             </div>

//             <div className="section-title">Gender</div>
//             <div className="gender-row">
//               {["Male", "Female", "Other"].map(g => (
//                 <label key={g}>
//                   <input
//                     type="radio"
//                     name="gender"
//                     value={g}
//                     checked={form.gender === g}
//                     onChange={handleChange("gender")}
//                   />
//                   {g}
//                 </label>
//               ))}
//             </div>

//             <div className="section-title">Address</div>
//             <div className="grid">
//               <textarea placeholder="Address" value={form.address} onChange={handleChange("address")} />
//               <input placeholder="City" value={form.city} onChange={handleChange("city")} />
//               <input placeholder="State" value={form.state} onChange={handleChange("state")} />
//               <input placeholder="Pincode" value={form.pincode} onChange={handleChange("pincode")} />
//             </div>

//             <div className="section-title">Qualifications</div>
//             <div className="grid">
//               <input placeholder="College Name" value={qualificationInput.collegeName} onChange={handleQualificationInputChange("collegeName")} />
//               <select value={qualificationInput.course} onChange={handleQualificationInputChange("course")}>
//                 <option value="">Select Course</option>
//                 <option value="BSc">BSc</option>
//                 <option value="BCom">BCom</option>
//                 <option value="BTech">BTech</option>
//               </select>
//               <input placeholder="Year" value={qualificationInput.year} onChange={handleQualificationInputChange("year")} />
//               <input placeholder="Percentage" value={qualificationInput.percentage} onChange={handleQualificationInputChange("percentage")} />
//             </div>

//             <button type="button" onClick={editIndex !== null ? updateQualification : addQualification}>
//               {editIndex !== null ? "Update" : "Add"}
//             </button>

//             {form.qualifications.map((q, i) => (
//               <div key={i} className="qual-box">
//                 <span>[{i + 1}] {q.collegeName} – {q.course} – {q.year} – {q.percentage}%</span>
//                 <span>
//                   <button type="button" onClick={() => editQualification(i)}>Edit</button>
//                   <button type="button" onClick={() => removeQualification(i)}>Remove</button>
//                 </span>
//               </div>
//             ))}

//             <div className="section-title">Security</div>
//             <div className="grid">
//               <input type="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
//               <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} />
//             </div>

//             <div className="declaration">
//               <div className="checkbox-box" onClick={() => setForm(prev => ({ ...prev, declaration: !prev.declaration }))}>
//                 {form.declaration && "✓"}
//               </div>
//               <span>I hereby declare that the information provided is true.</span>
//             </div>

//             <button className="submit-btn" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Application"}
//             </button>

//             <button type="button" className="pdf-btn" onClick={exportPDF}>
//               Download PDF
//             </button>

//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import { jsPDF } from "jspdf";
import { registerUser } from "../services/api";

export default function Register() {

  const currentYear = new Date().getFullYear();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    collegeName: "",
    course: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    qualifications: [],
    declaration: false
  });

  const [qualificationInput, setQualificationInput] = useState({
    collegeName: "",
    course: "",
    year: "",
    percentage: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQualificationInputChange = (field) => (e) =>
    setQualificationInput(prev => ({
      ...prev,
      [field]: e.target.value
    }));

  const validateYear = (year) => {
    const y = Number(year);
    return y >= 1960 && y <= currentYear;
  };

  const addQualification = () => {
    const { collegeName, course, year, percentage } = qualificationInput;

    if (!collegeName || !course || !year || !percentage) {
      alert("Fill all qualification details");
      return;
    }

    if (!validateYear(year)) {
      alert(`Year must be between 1960 and ${currentYear}`);
      return;
    }

    if (Number(percentage) > 100) {
      alert("Percentage cannot exceed 100");
      return;
    }

    setForm(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, qualificationInput]
    }));

    setQualificationInput({
      collegeName: "",
      course: "",
      year: "",
      percentage: ""
    });
  };

  const removeQualification = (index) => {
    setForm(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const editQualification = (index) => {
    setQualificationInput(form.qualifications[index]);
    setEditIndex(index);
  };

  const updateQualification = () => {

    if (!validateYear(qualificationInput.year)) {
      alert(`Year must be between 1960 and ${currentYear}`);
      return;
    }

    if (Number(qualificationInput.percentage) > 100) {
      alert("Percentage cannot exceed 100");
      return;
    }

    setForm(prev => {
      const updated = [...prev.qualifications];
      updated[editIndex] = qualificationInput;
      return { ...prev, qualifications: updated };
    });

    setQualificationInput({
      collegeName: "",
      course: "",
      year: "",
      percentage: ""
    });

    setEditIndex(null);
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, phone, dob, gender, address, city, state, pincode, password, confirmPassword, qualifications } = form;

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!phone || !/^[0-9]{10}$/.test(phone)) errors.phone = "Valid phone required";
    if (!dob) errors.dob = "DOB required";
    if (!gender) errors.gender = "Gender required";
    if (!address) errors.address = "Address required";
    if (!city) errors.city = "City required";
    if (!state) errors.state = "State required";
    if (!pincode || !/^[0-9]{6}$/.test(pincode)) errors.pincode = "Valid pincode required";
    if (!password) errors.password = "Password required";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords must match";
    if (!qualifications.length) errors.qualifications = "Add qualification";

    return errors;
  };

  const exportPDF = () => {

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      alert("Please fix form errors before downloading PDF");
      return;
    }

    if (!form.declaration) {
      alert("Please accept declaration before downloading PDF");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Application Form", 20, 20);

    doc.setFontSize(11);
    doc.text(`Name: ${form.name}`, 20, 35);
    doc.text(`Email: ${form.email}`, 20, 45);
    doc.text(`Phone: ${form.phone}`, 20, 55);
    doc.text(`DOB: ${form.dob}`, 20, 65);
    doc.text(`Gender: ${form.gender}`, 20, 75);

    doc.text("Address:", 20, 90);
    doc.text(`${form.address}`, 20, 100);
    doc.text(`${form.city}, ${form.state} - ${form.pincode}`, 20, 110);

    doc.text("Qualifications:", 20, 130);

    let y = 140;

    form.qualifications.forEach((q, i) => {
      doc.text(
        `[${i + 1}] ${q.collegeName} - ${q.course} - ${q.year} - ${q.percentage}%`,
        20,
        y
      );
      y += 10;
    });

    doc.save("application-form.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      alert("Please fix errors before submit");
      return;
    }

    if (!form.declaration) {
      alert("Please accept declaration");
      return;
    }

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
        }

        .page {
          padding: 20px 40px;
        }

        .form-container {
          background: white;
          border: 1px solid #cfd8dc;
          padding: 20px;
        }

        .header {
          font-size: 18px;
          border-bottom: 1px solid #b0bec5;
          padding-bottom: 6px;
          color: #00695c;
        }

        .section-title {
          font-size: 13px;
          margin: 15px 0 8px;
          border-bottom: 1px solid #d0d7dc;
          color: #00695c;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 8px 12px;
        }

        input, select, textarea {
          padding: 6px;
          font-size: 12px;
          border: 1px solid #b0bec5;
          background: #f9fbfc;
        }

        button {
          font-size: 11px;
          padding: 6px 12px;
          margin-top: 10px;
          cursor: pointer;
        }

        .qual-box {
          border: 1px solid #cfd8dc;
          padding: 6px;
          font-size: 11px;
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
        }

        .gender-row {
          display: flex;
          gap: 20px;
          font-size: 12px;
          margin-top: 8px;
        }

        .declaration {
          display: flex;
          align-items: center;
          margin-top: 14px;
          font-size: 12px;
        }

        .checkbox-box {
          width: 16px;
          height: 16px;
          border: 1px solid black;
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .submit-btn {
          background: #00695c;
          color: white;
          border: none;
        }

        .pdf-btn {
          background: #2d89ff;
          color: white;
          border: none;
          margin-left: 10px;
        }
      `}</style>

      <div className="page">
        <div className="form-container">
          <div className="header">Application / Registration Form</div>

          <form onSubmit={handleSubmit}>

            <div className="section-title">Personal Details</div>
            <div className="grid">
              <input placeholder="Full Name" value={form.name} onChange={handleChange("name")} />
              <input placeholder="Email (Gmail)" value={form.email} onChange={handleChange("email")} />
              <input placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} />
              <input type="date" value={form.dob} onChange={handleChange("dob")} />
            </div>

            <div className="section-title">Gender</div>
            <div className="gender-row">
              {["Male", "Female", "Other"].map(g => (
                <label key={g}>
                  <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange("gender")} />
                  {g}
                </label>
              ))}
            </div>

            <div className="section-title">Address</div>
            <div className="grid">
              <textarea placeholder="Address" value={form.address} onChange={handleChange("address")} />
              <input placeholder="City" value={form.city} onChange={handleChange("city")} />
              <input placeholder="State" value={form.state} onChange={handleChange("state")} />
              <input placeholder="Pincode" value={form.pincode} onChange={handleChange("pincode")} />
            </div>

            <div className="section-title">Qualifications</div>
            <div className="grid">
              <input placeholder="College Name" value={qualificationInput.collegeName} onChange={handleQualificationInputChange("collegeName")} />
              <select value={qualificationInput.course} onChange={handleQualificationInputChange("course")}>
                <option value="">Select Course</option>
                <option value="BSc">BSc</option>
                <option value="BCom">BCom</option>
                <option value="BTech">BTech</option>
              </select>
              <input placeholder="Year" value={qualificationInput.year} onChange={handleQualificationInputChange("year")} />
              <input placeholder="Percentage" value={qualificationInput.percentage} onChange={handleQualificationInputChange("percentage")} />
            </div>

            <button type="button" onClick={editIndex !== null ? updateQualification : addQualification}>
              {editIndex !== null ? "Update" : "Add"}
            </button>

            {form.qualifications.map((q, i) => (
              <div key={i} className="qual-box">
                <span>[{i + 1}] {q.collegeName} – {q.course} – {q.year} – {q.percentage}%</span>
                <span>
                  <button type="button" onClick={() => editQualification(i)}>Edit</button>
                  <button type="button" onClick={() => removeQualification(i)}>Remove</button>
                </span>
              </div>
            ))}

            <div className="section-title">Security</div>
            <div className="grid">
              <input type="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
              <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} />
            </div>

            <div className="declaration">
              <div className="checkbox-box" onClick={() => setForm(prev => ({ ...prev, declaration: !prev.declaration }))}>
                {form.declaration && "✓"}
              </div>
              <span>I hereby declare that the information provided is true.</span>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <button type="button" className="pdf-btn" onClick={exportPDF}>
              Download PDF
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

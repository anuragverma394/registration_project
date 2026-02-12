import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name cannot contain numbers or special characters";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }


    if(!confirmPassword){
      newErrors.confirmPassword= "Confirm Password is required";

    }else if(password !== confirmPassword){
      newErrors.confirmPassword = "Passwords do not match";
    }

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
 //Here we are  send data to the backend server using fetch API. We are sending a POST request to the /register endpoint with the form data in JSON format. We also handle the response and show appropriate messages based on success or failure. Finally, we clear the form and reset errors if registration is successful.
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
//Read server response and handle success or error messages accordingly. If the registration is successful, we alert the user and clear the form fields. If there's an error, we display an alert with the error message.
      const data = await res.json();

      //if server says something went wrong, we throw an error to be caught in the catch block
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert(data.message);

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});

    } catch (err) {
      alert(err.message || "Server Error");

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
  font-family: Arial, sans-serif;
  background: #f2f4f8;

  display: flex;              /* KEY PART */
  justify-content: center;    /* Horizontal center */
  align-items: center;        /* Vertical center */
  height: 100vh;              /* Full screen height */
}
        .page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          width: 360px;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(229, 212, 212, 0.88);
          justify-content: center;

        }

        .title {
          text-align: center;
          color: #2d89ff;
          margin-bottom: 20px;
        }

        .input {
          width: 100%;
          border: none;
          border-bottom: 2px solid #e0e0e0;
          padding: 10px 5px;
          margin-top: 10px;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
        }

        .input:focus {
          border-bottom-color: #2d89ff;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }

        .button {
          width: 100%;
          border: none;
          padding: 12px;
          border-radius: 25px;
          background: linear-gradient(90deg, #2d89ff, #00c9a7);
          color: white;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 20px;
        }

        .button:hover {
          opacity: 0.9;
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h2 className="title">Registration Form</h2>

          <form onSubmit={handleSubmit} autoComplete="off">

            <input
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="error">{errors.name}</div>}

            <input
              className="input"
              placeholder="Email Address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <input
              className="input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}

            <input
              className="input"
              placeholder="Password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
            <input
            className="input"
             placeholder="confrim password"
             type="password"
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
             />
              {errors.confirmPassword && 
              (<div className="error">{errors.confirmPassword}</div>)}
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

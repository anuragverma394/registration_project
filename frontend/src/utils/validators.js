export const validateRegister = ({
  name,
  email,
  phone,
  dob,
  gender,
  address,
  city,
  state,
  pincode,
  password,
  confirmPassword,
  qualifications
}) => {

  const errors = {};

  // ✅ Name
  if (!name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    errors.name = "Name cannot contain numbers or special characters";
  }

  // ✅ Email
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  // ✅ Phone
  if (!phone) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(phone)) {
    errors.phone = "Phone must be exactly 10 digits";
  }

  // ✅ DOB
  if (!dob) {
    errors.dob = "Date of Birth is required";
  }

  // ✅ Gender
  if (!gender) {
    errors.gender = "Please select gender";
  }

  // ✅ Address
  if (!address) {
    errors.address = "Address is required";
  }

  // ✅ City
  if (!city) {
    errors.city = "City is required";
  }

  // ✅ State
  if (!state) {
    errors.state = "State is required";
  }

  // ✅ Pincode
  if (!pincode) {
    errors.pincode = "Pincode is required";
  } else if (!/^[0-9]{6}$/.test(pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  // ✅ Password
  if (!password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
  ) {
    errors.password =
      "Password must contain uppercase, lowercase, number & special character";
  }

  // ✅ Confirm Password
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // ✅ Qualifications (Very Important)
  if (!qualifications.length) {
    errors.qualifications = "Add at least one qualification";
  }

  return errors;
};

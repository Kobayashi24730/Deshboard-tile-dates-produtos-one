import { useState } from "react";
import "../styles/ProfileStyles.css";

export default function Profile() {

  const [user, setUser] = useState({
    firstName: "Jordan",
    lastName: "Hamidul",
    occupation: "Web Developer",
    fatherName: "Hamidul",
    motherName: "Hamidul",
    gender: "Male",
    religion: "Islam",
    admissionDate: "2022-09-01",
    className: "Inter",
    roll: "57",
    id: "134587",
    address: "Household de Jamshed",
    location: "Jamshed Para 3456",
    email: "jordan@email.com",
    phone: "+880 34567890"
  });

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-container">

      {/* HEADER */}

      <div className="profile-header">

        <div className="profile-info">
          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            className="profile-avatar"
          />

          <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.occupation}</p>

            <div className="profile-contact">
              <span>{user.phone}</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

      </div>

      {/* FORM */}

      <div className="profile-form">

        <div className="form-grid">

          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />

          <input
            name="occupation"
            value={user.occupation}
            onChange={handleChange}
            placeholder="Occupation"
          />

          <input
            name="fatherName"
            value={user.fatherName}
            onChange={handleChange}
            placeholder="Father Name"
          />

          <input
            name="motherName"
            value={user.motherName}
            onChange={handleChange}
            placeholder="Mother Name"
          />

          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            name="religion"
            value={user.religion}
            onChange={handleChange}
            placeholder="Religion"
          />

          <input
            type="date"
            name="admissionDate"
            value={user.admissionDate}
            onChange={handleChange}
          />

          <input
            name="className"
            value={user.className}
            onChange={handleChange}
            placeholder="Class"
          />

          <input
            name="roll"
            value={user.roll}
            onChange={handleChange}
            placeholder="Roll"
          />

          <input
            name="id"
            value={user.id}
            onChange={handleChange}
            placeholder="ID"
          />

          <input
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <input
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Location"
          />

        </div>

        <button className="save-btn">
          Salvar Alterações
        </button>

      </div>

    </div>
  );
}

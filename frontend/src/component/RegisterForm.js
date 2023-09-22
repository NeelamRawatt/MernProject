// RegistrationForm.js

// function RegisterForm({ onRegistration }) {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [isUsernameTaken, setIsUsernameTaken] = useState(false);

//   const handleRegister = async () => {
//     try {
//       // Check if the username is already taken
//       const response = await Axios.get(
//         `http://localhost:3001/checkUsername/${username}`
//       );
//       if (response.data.isTaken) {
//         setIsUsernameTaken(true);
//         return;
//       }

//       // Register the user if the username is available
//       await Axios.post("http://localhost:3001/registerUser", {
//         username,
//         name,
//       });

//       // Notify the parent component that registration is successful
//       onRegistration();

//       // Clear the form
//       setUsername("");
//       setName("");
//       setIsUsernameTaken(false);
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         required
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         required
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={handleRegister}>Register</button>
//       {/* <button>Register</button> */}

//       {/* {isUsernameTaken && <p>Username is already taken.</p>} */}
//     </div>
//   );
// }
import React, { useState } from "react";
import Axios from "axios";

function RegisterForm({ onRegistration }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/checkUsername/${username}`
      );
      if (response.data.isTaken) {
        setIsUsernameTaken(true);
        return;
      }

      await Axios.post("http://localhost:3001/registerUser", {
        username,
        password,
      });

      onRegistration();

      setUsername("");
      setPassword("");
      setIsUsernameTaken(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {isUsernameTaken && <p>Username is already taken.</p>}
    </div>
  );
}

export default RegisterForm;

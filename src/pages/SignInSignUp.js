import React, { useState } from 'react'
import Header from '../components/Header'
import InputCom from '../components/Input'
import Button from "../components/Button";
function SignInSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignup = () => {
    console.log("Signup");
   }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Signup</h1>
        <InputCom
          state={fullName}
          setState={setFullName}
          placeholder="Full Name"
          type="text"
          required={true}
        />
        <InputCom
          state={email}
          setState={setEmail}
          placeholder="Email"
          type="email"
          required={true}
        />
        <InputCom
          state={Password}
          setState={setPassword}
          placeholder="Password"
          type="password"
          required={true}
        />
        <InputCom
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Confirm Password"
          type="password"
          required={true}
        />
        <Button text="Signup" onClick={handleSignup} />
      </div>
    </div>
  );
}

export default SignInSignUp
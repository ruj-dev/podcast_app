import React, { useState } from 'react'
import InputCom from '../Input';
import Button from '../Button';

function SignUpForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     const handleSignup = () => {
       console.log("Signup");
     };
    return (
      <div>
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
    );
}

export default SignUpForm;
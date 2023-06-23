import React, { useState } from 'react'
import InputCom from '../Input';
import Button from '../Button';

function LoginCom() {
   
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    
    const handleLogin = () => {
      console.log("Login");
    };
  return (
    <div>
    
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
     
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}

export default LoginCom
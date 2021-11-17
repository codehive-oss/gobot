import React from "react";

// div props
type LoginButtonProps = React.HTMLAttributes<HTMLDivElement>;

const loginURI = "http://localhost:4000/auth";

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  // return a anchor wrapped with a div with className applied
  return (
    <div className={className}>
      <a href={loginURI}>Login</a>
    </div>
  );
};

export default LoginButton;

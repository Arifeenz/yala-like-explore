import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page since we handle both login and register in one component
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Register;
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const SelectRole = (props) => {
  const { role, setRole } = props.details;
  const navigate = useNavigate();
  const submitRole = async(role) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/setMyRole`, {role},{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      });
      setRole(role);
      localStorage.setItem("role", role);
      toast.success("Role set successfully");
      navigate('/');
    } catch (error) {
      toast.error("Some error occured");
    }
  }
  return (
    <div>
      <h1>Select Role</h1>
      <button onClick={() => submitRole("user")}>User</button>
      <button onClick={() => submitRole("expert")}>Expert</button>
    </div>
  )
}

export default SelectRole

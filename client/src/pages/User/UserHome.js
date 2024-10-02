import React, { useEffect } from "react";
import UserForm from "../../components/UserForm";
const UserHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Home | NutriMitra";
  }, []);
  return (
    <>
      <div style={{textAlign: "center", width:"100%", padding:"2rem 0 0 0", fontWeight: "bolder", fontSize: "1.5rem"}}>Diet Recommendation</div>
      <div style={{
        width : "70%",
        margin: "0 auto",
        padding: "20px"

      }}>
      <UserForm />
      </div>
    </>
  );
};

export default UserHome;

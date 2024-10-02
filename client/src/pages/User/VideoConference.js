import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const VideoConference = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Video Conference | NutriMitra";
  }, []);
  const navigate = useNavigate();
  const connectcall =  () => {
    navigate("/startcall");
  }
  return (
    <div>
      <Button
          variant="contained"
          sx={
            {
              backgroundColor: "#3b8a51",
              ":hover": {
                backgroundColor: "#34a43c",
                transform: "scale(1.02)",
                transition: ".2s ease-out",
              },
            }
          }
          style={{
            float: "right",
            marginTop: "20px",
            marginRight: "20px",
          }}
          onClick={() => connectcall()}
          >
          Connect
        </Button>
    </div>
  )
}

export default VideoConference

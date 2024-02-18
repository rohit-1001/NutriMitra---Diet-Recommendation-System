import React, { useState } from 'react';
import { Button, Drawer, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const WriteBlog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // For handling image upload

  const handleSubmit = async (e) => {
    e.preventDefault();
    const useremail = localStorage.getItem('useremail');
    const username = localStorage.getItem('username');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Write a New Blog
      </Button>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '20px', width: '100%' , height: "100vh"}}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Write a New Blog</Typography>
            <CloseIcon onClick={() => setOpen(false)} style={{ cursor: 'pointer', float: 'right' }} />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              required
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default WriteBlog;

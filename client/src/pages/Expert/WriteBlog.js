import React, { useEffect, useState } from "react";
import { Button, Drawer, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import ReactMarkdown from 'react-markdown';

const WriteBlog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // For handling image upload
  const [formData, setFormData] = useState({});
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setUseremail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("name"));
    setDate(new Date().toDateString());
  }, []);

  useEffect(() => {
    getAllBlogsByTheUser();
  }, [useremail]);

  async function getAllBlogsByTheUser() {
    try {
      //  alert(useremail)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/getblogsbyemail`,
        { useremail: useremail }
      );
      // console.log("USER BLOGS: ", response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(image); // Convert image to base64 string
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setFormData({
        title,
        content,
        image: base64Image,
        useremail,
        username,
        date,
      });
    };
  };

  async function sendBlogToBackend(blogs) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createblogs`,
        blogs
      );
      toast.success("Blog created successfully");
      setOpen(false);
      setTitle("");
      setContent("");
      setImage(null);
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(formData);
    if (formData.title && formData.content && formData.image) {
      sendBlogToBackend(formData);
    }
  }, [formData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  function MultiActionAreaCard({ title, content, image }) {
    return (
      <Card sx={{ maxWidth: 345, borderRadius: 10, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{ objectFit: "cover" }} // Ensures the image covers the entire area
          />
          <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "boldest" }}
            >
              {title.length > 25 ? title.substring(0, 25) + "..." : title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{ textAlign: "left" }}
            >
              {content.length > 100
                ? content.substring(0, 100) + "..."
                : content}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexShrink: 0 }}>
            <Button
              size="small"
              color="primary"
              onClick={() => handleReadMore({ title, content, image })}
            >
              Read more...
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Write a New Blog +
        </Button>
      </div>

      {/* fetching all blogs by the user */}
      <div style={{
        fontSize: "20px",
        fontWeight: "bold",
        padding: "0 20px",
      }}>Your Blogs</div>
      <div
        style={{
          width: "100%",
          // border: "1px solid black",
        }}
      >
        <Grid container spacing={2} sx={{ margin: "0 -2px" }}>
          {blogs.map((blog) => (
            <Grid
              item
              key={blog._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ padding: "0 8px" }}
            >
              <MultiActionAreaCard
                title={blog.title}
                content={blog.content}
                image={blog.image}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {/* for the expert to write a blog */}
      <div>
        <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: "20px", width: "100%", height: "100vh" }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6">Write a New Blog</Typography>
              <CloseIcon
                onClick={() => setOpen(false)}
                style={{ cursor: "pointer", float: "right" }}
              />
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </Drawer>
      </div>

      {/* Drawer to Display the Selected Blog */}
      <div>
        <Drawer
          anchor="bottom"
          open={selectedBlog !== null}
          onClose={() => setSelectedBlog(null)}
        >
          <div style={{ padding: "20px", width: "100%", height: "100vh" }}>
            <Typography variant="h6">{selectedBlog?.title}</Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            <ReactMarkdown>{selectedBlog?.content}</ReactMarkdown>
            </Typography>
            <img src={selectedBlog?.image} alt={selectedBlog?.title} />
            {/* Additional details of the blog can be displayed here */}
            <CloseIcon
              onClick={() => setSelectedBlog(null)}
              style={{ cursor: "pointer", float: "right" }}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default WriteBlog;

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import ReactMarkdown from "react-markdown";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Drawer, TextField } from "@material-ui/core";

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
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setUseremail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("name"));
    setDate(new Date().toDateString());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Blogs";
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

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const blogID = selectedBlog._id;
    try {
      const response =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addcomment`, {
        blogId: blogID, 
        comment: newComment,
        username : localStorage.getItem("name"),
        useremail : localStorage.getItem("email"),
      });
      toast.success("Comment posted successfully");
      setNewComment(""); // Clear the input field\
    setSelectedBlog(response.data.blog);
      
    } catch (error) {
      console.error(error);
    }
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

  function MultiActionAreaCard({
    title,
    content,
    image,
    Date,
    Username,
    comments,
    _id,
  }) {
    return (
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
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
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                textAlign: "left",
                fontStyle: "italic",
                color: "grey",
                fontSize: "0.8rem",
              }}
            >
              Written By : {Username == localStorage.getItem("name") ? "You" : Username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                textAlign: "left",
                fontStyle: "italic",
                color: "grey",
                fontSize: "0.8rem",
              }}
            >
              Date : {Date}
              {/* {_id} */}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexShrink: 0 }}>
            <Button
              size="small"
              color="primary"
              onClick={() =>
                handleReadMore({
                  title,
                  content,
                  image,
                  Date,
                  Username,
                  comments,
                    _id,
                })
              }
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
                Date={blog.date}
                Username={blog.username}
                comments={blog.comments}
                _id={blog._id}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Drawer for the expert to write a blog */}
      <div>
        <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        
          <div style={{ padding: "20px", width: "100%", height: "100vh"}}>
          <CloseIcon
                onClick={() => setOpen(false)}
                style={{ cursor: "pointer", float: "right" }}
              />
            <form onSubmit={handleSubmit} style={{
              // border: "2px solid green",
              width: "100%",
              margin: "0 auto",
            }}>

              <Typography variant="h6">Write a New Blog</Typography>
              
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
              <div style={{
                width: "100%",
                margin: "1.5em 0"
              }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              </div>
              <div style={{
                width: "100%",
                margin: "1.5em 0",
                // border: "1px solid red",
                display: "flex",
                justifyContent: "center",
              }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              </div>
            </form>
          </div>
        </Drawer>
      </div>

      {/* Drawer to Display the Selected Blog */}
      <div>
        <Drawer
          anchor="bottom"
          open={selectedBlog !== null}
          onClose={() => {
            setSelectedBlog(null);
            getAllBlogsByTheUser();
           }} 
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#158344",
                color: "white",
                textAlign: "center",
              }}
            >
              <div style={{
                // border: "1px solid white",
                width: "100vw",
                margin: "0 auto",
                fontSize: "1.3rem",
              }} >{selectedBlog?.title}</div>
              <CloseIcon
                onClick={() => {
                    setSelectedBlog(null);
                    getAllBlogsByTheUser(); 
                   }}
                style={{ cursor: "pointer"}}
              />
            </div>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={selectedBlog?.image}
                alt={selectedBlog?.title}
                style={{ height: "300px", width: "600px", objectFit: "cover" }}
              />
           
              <div
                style={{ width: "75%", margin: "20px 0", textAlign: "justify" }}
              >
                    <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                textAlign: "left",
                fontStyle: "italic",
                color: "grey",
                fontSize: "0.8rem",
              }}
            >
              Written By :{selectedBlog?.Username == localStorage.getItem("name") ? "You" : selectedBlog?.Username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              sx={{
                textAlign: "left",
                fontStyle: "italic",
                color: "grey",
                fontSize: "0.8rem",
                margin: "10px 0"
              }}
            >
              Date : {selectedBlog?.Date}
              {/* {_id} */}
            </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  <ReactMarkdown>{selectedBlog?.content}</ReactMarkdown>
                </Typography>
              </div>
              {/* {selectedBlog.comments && (
                <div style={{ width: "75%", margin: "20px 0" }}>
                  <Typography variant="h6">Comments:</Typography>
                  {selectedBlog.comments.map((comment, index) => (
                    <Typography key={index} variant="body1">
                      {comment}
                    </Typography>
                  ))}
                </div>
              )} */}
              {/* {selectedBlog?._id && (<div>{selectedBlog._id}</div>)} */}
              {selectedBlog?.comments && (
                <div style={{ width: "75%", margin: "20px 0" }}>
                  <Typography variant="h6">Comments:</Typography>
                  {selectedBlog.comments.map((comment, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #158344",
                        padding: "10px",
                        margin: "10px 0",
                      }}
                    >
                      <Typography variant="body1">
                        <strong>{comment.username === localStorage.getItem('name') ? "You" : comment.username }</strong>: {comment.comment}
                      </Typography>
                    </div>
                  ))}
                </div>
                )}
              <form
                onSubmit={handleSubmit2}
                style={{
                  width: "75%",
                  margin: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  fullWidth
                  multiline
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  Post Comment
                </Button>
              </form>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default WriteBlog;

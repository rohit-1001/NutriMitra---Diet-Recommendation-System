import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
// import Footer from '../components/Footer';
async function createDummyBlog(blogs) {
    alert("Inside Create Dummy Blog")
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createblogs`, blogs);
        // alert("HELLO")
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}



const Blogs = () => {
    const dummy = [
        {
            title: 'Blog 1',
            content: 'This is the content of blog 1',
            youtubeLink: 'https://www.youtube.com/watch?v=1'
        },
        {
            title: 'Blog 2',
            content: 'This is the content of blog 2',
            youtubeLink: 'https://www.youtube.com/watch?v=2'
        },
        {
            title: 'Blog 3',
            content: 'This is the content of blog 3',
            youtubeLink: 'https://www.youtube.com/watch?v=3'
        },
        {
            title: 'Blog 3',
            content: 'This is the content of blog 3',
            youtubeLink: 'https://www.youtube.com/watch?v=3'
        },
        {
            title: 'Blog 3',
            content: 'This is the content of blog 3',
            youtubeLink: 'https://www.youtube.com/watch?v=3'
        }
    ];
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getblogs`); // Assuming your backend API endpoint for fetching blogs is /blogs
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    // useEffect(() => {
    //     createDummyBlog(dummy);
    // },[]);

    const BlogModal = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '90vw', // Adjust the width as needed
        maxHeight: '80vh', // Adjust the height as needed
        overflowY: 'auto', // Enable vertical scrolling
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center', // Align contents at the center
    }));

    const [open, setOpen] = useState(false);
    const [blog, setBlog] = useState({});

    const handleOpen = (e) => {
        e.preventDefault(); // Prevent the default behavior (page refresh)
        const blogId = e.target.href.split('/').pop();
        const selectedBlog = blogs.find(blog => blog._id === blogId);
        setBlog(selectedBlog);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div style={{
                padding: "2rem",
            }}>
            <Grid container spacing={4}>
                {blogs.map(blog => (
                    <Grid item xs={12} sm={10} md={3} key={blog._id}>
                        <Card style={{
                            borderRadius: "5px",
                            backgroundColor: "rgb(232, 238, 244)",
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="h2" style={{
                                    margin: "1em"
                                }}>{blog.title}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p" style={{
                                    margin: "1em"
                                }}>
                                    {blog.content.substring(0, 100)}...
                                </Typography>
                                <Button href={`/blogs/${blog._id}`} onClick={handleOpen} style={{
                                    margin: "1em",
                                    color: "158344",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    padding: "0.5em"

                                }}>Read More</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BlogModal style={{
                    padding: "3rem",
                }}>
                    <h2 id="modal-modal-title" style={{
                        margin: "0 0 2rem 0"
                    }}>{blog.title}</h2>
                    {blog.youtubeLink && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${blog.youtubeLink.split('=')[1]}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                    <div style={{
                        padding: "2em 0",
                        textAlign: "justify"
                    }}>{blog.content}</div>
                </BlogModal>
            </Modal>
            <br></br>
            {/* <Footer/> */}
        </>
    );
};

export default Blogs;

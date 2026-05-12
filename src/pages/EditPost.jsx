import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((doc) => {
        if (doc) {
          setPost(doc);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("EditPost::getPost error", err);
        navigate("/");
      });
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPost;

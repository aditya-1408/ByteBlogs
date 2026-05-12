import { useEffect, useState } from "react";
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
    <div className="py-12 sm:py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            Creator studio
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Edit post
          </h1>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPost;

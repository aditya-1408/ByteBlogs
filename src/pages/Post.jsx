import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container } from "../components";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

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
        console.log("Post::getPost error", err);
        navigate("/");
      });
  }, [slug, navigate]);

  if (!post || post.$id !== slug) return null;

  const fileId = post.featuredimage || post.featuredImage;
  const previewSrc = fileId ? appwriteService.getFilePreview(fileId) : "";
  const viewSrc = fileId ? appwriteService.getFileView(fileId) : "";
  const postOwnerId = post.userid || post.userId;
  const isOwner = Boolean(userData?.$id && postOwnerId === userData.$id);

  return (
    <div className="w-full py-12 sm:py-16">
      <Container className="max-w-5xl">
        <article className="animate-fade-up overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
                MegaBlog story
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>
            </div>
            {isOwner ? (
              <Link
                to={`/edit-post/${post.$id}`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Edit
              </Link>
            ) : null}
          </div>

          {fileId ? (
            <div className="mb-8 w-full overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-xl shadow-slate-900/10">
              <img
                src={previewSrc}
                alt={post.title}
                className="max-h-[620px] w-full object-cover"
                onError={(e) => {
                  if (viewSrc && e.currentTarget.src !== viewSrc) {
                    e.currentTarget.src = viewSrc;
                  }
                }}
              />
            </div>
          ) : null}

          <div className="article-content w-full">
            {post.content ? parse(post.content) : null}
          </div>
        </article>
      </Container>
    </div>
  );
}

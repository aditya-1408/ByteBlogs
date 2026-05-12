import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    setLoading(true);
    appwriteService
      .getPost(slug)
      .then((doc) => {
        if (doc) {
          setPost(doc);
        } else {
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) return null;
  if (!post) return null;

  const fileId = post.featuredimage || post.featuredImage;
  const previewSrc = fileId ? appwriteService.getFilePreview(fileId) : "";
  const viewSrc = fileId ? appwriteService.getFileView(fileId) : "";

  return (
    <div className="w-full py-8">
      <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>

      {fileId ? (
        <div className="w-full mb-6">
          <img
            src={previewSrc}
            alt={post.title}
            className="rounded-lg w-full"
            onError={(e) => {
              if (viewSrc && e.currentTarget.src !== viewSrc) {
                e.currentTarget.src = viewSrc;
              }
            }}
          />
        </div>
      ) : null}

      <div className="w-full">{post.content ? parse(post.content) : null}</div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

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
  const postOwnerId = post.userid || post.userId;
  const isOwner = Boolean(userData?.$id && postOwnerId === userData.$id);

  return (
    <div className="w-full py-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        {isOwner ? (
          <Link
            to={`/edit-post/${post.$id}`}
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Edit
          </Link>
        ) : null}
      </div>

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

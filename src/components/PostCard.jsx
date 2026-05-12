import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage, featuredImage }) {
  const fileId = featuredimage || featuredImage;
  const previewSrc = fileId ? appwriteService.getFilePreview(fileId) : "";
  const viewSrc = fileId ? appwriteService.getFileView(fileId) : "";
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        {fileId ? (
          <div className="w-full justify-center mb-4">
            <img
              src={previewSrc}
              alt={title}
              className="rounded-xl"
              onError={(e) => {
                if (viewSrc && e.currentTarget.src !== viewSrc) {
                  e.currentTarget.src = viewSrc;
                }
              }}
            />
          </div>
        ) : null}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

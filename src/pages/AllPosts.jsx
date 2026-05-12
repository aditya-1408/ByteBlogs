import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((result) => {
        if (result) {
          setPosts(result.documents);
        }
      })
      .catch((err) => console.log("AllPosts::getPosts error", err));
  }, []);

  return (
    <div className="w-full py-12 sm:py-16">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Archive
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              All posts
            </h1>
          </div>
          <div className="w-fit rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-bold text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur">
            {posts.length} published
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="animate-fade-up">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((err) => console.log("Home::getPosts error", err));
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl animate-fade-up rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-12">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 text-2xl font-black text-white shadow-xl shadow-slate-900/20">
              M
            </div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Private publishing space
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Login to read posts
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
              Your dashboard is ready. Sign in to unlock the latest stories,
              drafts, and creator updates.
            </p>
            <div className="mx-auto mt-8 h-2 max-w-sm rounded-full bg-slate-100 shimmer-line" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 sm:py-16">
      <Container>
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="animate-fade-up">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
              Fresh from MegaBlog
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Discover stories with a cleaner, richer reading flow.
            </h1>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-900/8 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">Live library</p>
                <p className="text-3xl font-black text-slate-950">
                  {posts.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-teal-100 shadow-inner shadow-teal-700/10" />
            </div>
          </div>
        </section>

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

export default Home;

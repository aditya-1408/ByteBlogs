import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            Creator studio
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Add post
          </h1>
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;

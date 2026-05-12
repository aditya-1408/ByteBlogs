import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage, featuredImage }) {
  const fileId = featuredimage || featuredImage;
  const previewSrc = fileId ? appwriteService.getFilePreview(fileId) : "";
  const viewSrc = fileId ? appwriteService.getFileView(fileId) : "";
  return (
    <Link
      to={`/post/${$id}`}
      className="group block h-full rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-3 shadow-xl shadow-slate-900/8 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/15">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent" />
        {fileId ? (
          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={previewSrc}
              alt={title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              onError={(e) => {
                if (viewSrc && e.currentTarget.src !== viewSrc) {
                  e.currentTarget.src = viewSrc;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ) : (
          <div className="mb-4 grid aspect-[4/3] w-full place-items-center rounded-2xl bg-gradient-to-br from-slate-100 via-teal-50 to-rose-50">
            <span className="text-4xl font-black text-slate-300">MB</span>
          </div>
        )}
        <div className="flex flex-1 flex-col px-1 pb-2">
          <span className="mb-3 w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-teal-700">
            Featured
          </span>
          <h2 className="line-clamp-2 text-lg font-black leading-snug text-slate-950 transition-colors duration-300 group-hover:text-teal-700">
            {title}
          </h2>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-slate-500">
            <span>Read story</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;

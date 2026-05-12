import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  const submit = async (data) => {
    setError("");
    try {
      if (!userData?.$id) {
        throw new Error("User not found in session. Please login again.");
      }

      if (post) {
        const existingFileId = post.featuredimage || post.featuredImage;
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && existingFileId) {
          await appwriteService.deleteFile(existingFileId);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredimage: file ? file.$id : existingFileId,
        });

        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await appwriteService.uploadFile(data.image?.[0]);
        if (!file?.$id) {
          throw new Error("Featured image upload failed.");
        }

        const dbPost = await appwriteService.createPost({
          ...data,
          featuredimage: file.$id,
          userid: userData.$id,
        });

        navigate(`/post/${dbPost.$id}`);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
      console.log("PostForm::submit error", err);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid animate-fade-up gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur lg:grid-cols-[minmax(0,1fr)_360px] sm:p-8"
    >
      <div className="min-w-0">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <aside className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-5 shadow-inner shadow-white">
        {error ? (
          <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-center text-sm font-bold text-rose-700">
            {error}
          </p>
        ) : null}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (post.featuredimage || post.featuredImage) ? (
          <div className="mb-4 w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/10">
            <img
              src={appwriteService.getFilePreview(
                post.featuredimage || post.featuredImage,
              )}
              alt={post.title}
              className="w-full object-cover"
              onError={(e) => {
                const fileId = post.featuredimage || post.featuredImage;
                const viewSrc = appwriteService.getFileView(fileId);
                if (viewSrc && e.currentTarget.src !== viewSrc) {
                  e.currentTarget.src = viewSrc;
                }
              }}
            />
          </div>
        ) : null}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-teal-600" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </aside>
    </form>
  );
}

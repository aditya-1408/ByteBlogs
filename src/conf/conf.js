const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceApiKey: String(
    import.meta.env.VITE_TINYMCE_API_KEY ??
      "j7dcr5yppwj3hxebunsgh72ns8tr5tfc7olh96edpr0o0em9",
  ),
};

export default conf;

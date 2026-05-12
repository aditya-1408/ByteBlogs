import conf from "../conf/conf.js";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  ensureConfig(requiredKeys = []) {
    const missing = requiredKeys.filter((key) => {
      const value = conf[key];
      return !value || value === "undefined" || value === "null";
    });

    if (missing.length) {
      throw new Error(
        `Missing Appwrite config (${missing.join(", ")}). Add them as Vite env vars (VITE_*) and restart the dev server.`,
      );
    }

    if (
      requiredKeys.includes("appwriteDatabaseId") &&
      requiredKeys.includes("appwriteCollectionId") &&
      conf.appwriteDatabaseId === conf.appwriteCollectionId
    ) {
      throw new Error(
        "Appwrite config error: Database ID and Collection ID are the same. You likely pasted the Database ID into VITE_APPWRITE_COLLECTION_ID. Copy the Collection ID from Appwrite Console → Databases → your database → Collections.",
      );
    }
  }

  async createPost({ title, slug, content, featuredimage, status, userid }) {
    this.ensureConfig(["appwriteDatabaseId", "appwriteCollectionId"]);
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid,
        },
      );
    } catch (error) {
      console.log("Appwrite service::createPost:: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    this.ensureConfig(["appwriteDatabaseId", "appwriteCollectionId"]);
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite service::updatePost:: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service::deletePost:: error", error);
      return false;
    }
  }

  async getPost(slug) {
    this.ensureConfig(["appwriteDatabaseId", "appwriteCollectionId"]);
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service::getPosts:: error", error);
      throw error;
    }
  }
  // now i want those values whose status is active
  async getPosts(queries = [Query.equal("status", "active")]) {
    //to use statis we nedd to make indexes in appwrite database
    this.ensureConfig(["appwriteDatabaseId", "appwriteCollectionId"]);
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service::getPosts:: error", error);
      throw error;
    }
  }
  async uploadFile(file) {
    this.ensureConfig(["appwriteBucketId"]);
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())],
      );
    } catch (error) {
      console.log("Appwrite service::uploadFile:: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("Appwrite service::deleteFile:: error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    if (!fileId) return "";

    const previewUrl = this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId,
    );
    return typeof previewUrl === "string" ? previewUrl : previewUrl.toString();
  }

  getFileView(fileId) {
    if (!fileId) return "";

    const viewUrl = this.bucket.getFileView(conf.appwriteBucketId, fileId);
    return typeof viewUrl === "string" ? viewUrl : viewUrl.toString();
  }
}

const appwriteService = new Service();
export default appwriteService;

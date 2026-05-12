import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  hasActiveSession() {
    if (typeof window === "undefined") return false;

    const sessionKey = `a_session_${conf.appwriteProjectId}`;

    if (typeof document !== "undefined") {
      const hasCookie = document.cookie
        ?.split("; ")
        ?.some((cookie) => cookie.startsWith(`${sessionKey}=`));
      if (hasCookie) return true;
    }

    try {
      const fallback = JSON.parse(
        window.localStorage.getItem("cookieFallback") ?? "{}",
      );
      return Boolean(fallback?.[sessionKey]);
    } catch {
      return false;
    }
  }

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name,
    );
    if (userAccount) {
      //call another method
      return this.login({ email, password });
    } else {
      return userAccount;
    }
  }
  async login({ email, password }) {
    return this.account.createEmailPasswordSession(email, password);
  }
  async createPasswordRecovery(email) {
    const recoveryUrl = `${window.location.origin}/reset-password`;
    return this.account.createRecovery(email, recoveryUrl);
  }
  async updatePasswordRecovery({ userId, secret, password }) {
    return this.account.updateRecovery(userId, secret, password);
  }
  async getCurrentUser() {
    // If there's no session cookie (or Appwrite's localStorage fallback), avoid calling /account.
    // This prevents the expected 401 from appearing as an error in the browser console.
    if (!this.hasActiveSession()) {
      return null;
    }
    try {
      return await this.account.get();
    } catch (error) {
      // When no user is logged in yet, Appwrite returns 401. Treat as a normal "no session" state.
      if (error?.code === 401) {
        return null;
      }
      console.log("Appwrite service::getCurrentUser:: error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service::logout:: error", error);
    }
  }
}
const authService = new AuthService();

export default authService;

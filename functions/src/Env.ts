import * as admin from "firebase-admin";
import {AppOptions} from "firebase-admin";
import {Email, SendgridEmail, TestModeEmail} from "./Email";

export type Mode = "test" | "production"

export class Env {
  private static instance: Env | undefined;

  private _email: Email;

  private constructor(email: Email) {
    this._email = email;
  }

  get email(): Email {
    return this._email;
  }

  static initializeOrGet(): Env {
    const localMode = process.env.LOCAL_FIREBASE_STATE as Mode;
    const mode = (localMode === undefined) ? "production" : localMode;

    if (mode === null && Env.instance === undefined) {
      throw new Error("Need mode to create initial environment");
    }

    if (Env.instance !== undefined) {
      return Env.instance;
    }

    let firebaseAdminOptions: AppOptions = {};
    let email: Email | null;
    switch (mode) {
      case "test":
        email = new TestModeEmail();
        firebaseAdminOptions = {
          // Starting a projectId with demo triggers test mode in firebase
          projectId: "demo-heig-firebase-testing",
        };
        break;
      case "production":
        email = new SendgridEmail();
        break;
      default:
        throw new Error("Unsupported mode");
    }

    Env.instance = new Env(email);

    try {
      admin.initializeApp(firebaseAdminOptions);
    } catch (e) {
      console.log("Already initialized admin app");
    }

    return Env.instance;
  }
}

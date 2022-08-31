import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Env} from "./Env";
import {Team} from "./Team";

/**
 * Suppose you would like to be informed when a new team is created on your
 * platform and that you want to save the name of the user who created the team
 */
export function teamsOnCreateFunction() {
  return functions.firestore
  .document("team/{teamId}")
  .onCreate((async (snapshot, context) => {
    const env = Env.initializeOrGet();
    const team = snapshot.data() as Team;
    const userId = context.auth?.uid;
    let updateData = undefined;

    // Send email
    env.email.emailInformation(team);

    // Add name of user
    if (userId !== undefined) {
      const user = await admin.auth().getUser(userId);
      updateData = {
        emailOfUserWhoCreatedThisTeam: user.email,
      };
    }

    if (updateData !== undefined) {
      return snapshot.ref.set(updateData, {merge: true});
    } else {
      return snapshot.ref;
    }
  }));
}

import * as functions from "firebase-functions";
import {Env} from "./Env";
import * as admin from "firebase-admin";
import {Team} from "./Team";

export function showTeamData() {
  return functions.https.onRequest(async (req, res) => {
    // Initializes environment
    await Env.initializeOrGet();

    if (req.method !== "POST") {
      res.sendStatus(400);
      return;
    }

    if (req.get("content-type") !== "application/x-www-form-urlencoded") {
      res.sendStatus(400);
      return;
    }

    /**
     * You can do all your verifications here, like the type of data you receive,
     * you can also verify JWT tokens, whatever you need, ...
     */

    if (!req.body.teamId) {
      res.sendStatus(400);
      return;
    }

    const result = await admin.firestore()
    .collection("/teams")
    .doc(req.body.teamId)
    .get();

    const team = result.data() as Team;

    res.type("text/json");
    res.send(JSON.stringify(team));
  });
}

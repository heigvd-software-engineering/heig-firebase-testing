import {Env} from "./Env";
import {teamsOnCreateFunction} from "./teamsOnCreate";
import {showTeamData as showTeamDataFunction} from "./showTeamData";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

Env.initializeOrGet();

export const teamsOnCreate = teamsOnCreateFunction()
export const showTeamData = showTeamDataFunction();

import {afterEach, before, describe, it} from "mocha";
import {
  assertFails, assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import {getTeam} from "../helpers/Team";
import firebase from "firebase/compat";

const PROJECT_ID = "heig-firebase-testing";
const userAId = "userAId";

describe("Firebase rules", async () => {
  let testEnv: RulesTestEnvironment;
  let unauthenticatedFirestore: firebase.firestore.Firestore;
  let userAFirestore: firebase.firestore.Firestore;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: "127.0.0.1",
        port: 8080
      },
    });

    unauthenticatedFirestore = testEnv.unauthenticatedContext().firestore();
    userAFirestore = testEnv.authenticatedContext(userAId).firestore();
  })

  afterEach(async () => {
    await testEnv.clearFirestore();
  });


  it("Non authenticated users cannot create a team", async () => {
    const team = getTeam("my test team");

    await assertFails(
      unauthenticatedFirestore.collection("/teams").add(team)
    );
  });
  it("Authenticated users can create a team", async () => {
    const team = getTeam("my test team", [userAId], [userAId]);

    await assertSucceeds(
      userAFirestore.collection("/teams").add(team)
    );
  });

  it("Cannot create a team if missing name", async () => {
    const fakeTeam = {}

    await assertFails(
      userAFirestore.collection("/teams").add(fakeTeam)
    );
  });

  it("Non administrators of a team cannot create it", async () => {
    const team = getTeam(
      "My team",
      ["SomeOtherId"],
      ["SomeOtherId"],
    )

    await assertFails(
      userAFirestore.collection("/teams").add(team)
    );
  });

  /*
   * You can of course check a lot more cases, but this will cover the basics of
   *  rule checking
   */
});
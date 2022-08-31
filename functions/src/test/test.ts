import "mocha";
import {assert} from "chai";

import * as admin from "firebase-admin";
import * as firebaseTest from "firebase-functions-test";

import axios from "axios";
import {Env} from "../Env";
import {initializeTests} from "./initializeTests";
import {user} from "./user";
import {afterEach} from "mocha";
import {Team} from "../Team";

const testFirestore = firebaseTest().firestore;
const region = "us-central1";
const url = `http://localhost:5001/${process.env.LOCAL_FIREBASE_PROJECT}/${region}/showTeamData`;

interface EndpointData {
  teamId: string | null | undefined,
}

function testEndpoint(
  data: EndpointData,
) {
  const queryArr = [];
  if (data.teamId) {
    queryArr.push(`teamId=${data.teamId}`);
  }

  const query = queryArr.join("&");

  return axios({
    url: url,
    method: "post",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    data: query,
  });
}

describe("Cloud functions", async () => {
  before(async () => {
    Env.initializeOrGet();
    await initializeTests(user);
  });

  afterEach(async () => {
    await testFirestore.clearFirestoreData({
      projectId: "demo-heig-firebase-testing"
    });
  });

  describe("Query validation", async () => {
    it("Returns 400 on missing teamId", async () => {
      const data = {
        teamId: undefined,
      };

      await testEndpoint(data).then(async () => {
        assert.fail();
        return null;
      }).catch((err) => {
        assert.equal(err.response.status, 400);
      });
    });

    it("Null data counts as missing data", async () => {
      const data = {
        teamId: null,
      };

      await testEndpoint(data).then(() => {
        assert.fail();
        return null;
      }).catch((err) => {
        assert.equal(err.response.status, 400);
      });
    });

    it("Doesn't return missing data message when data is not missing", async () => {
      const data = {
        teamId: "teamId",
      };

      await testEndpoint(data).then(() => {
        return null;
      }).catch((err) => {
        assert.notEqual(err.response.status, 400);
      });
    });
  });

  describe("Data validation", async () => {
    it("Returns the correct data", async () => {
      const teamName = "This is my team name";
      const team: Team = {
        name: teamName,
        roles: {admin: [user.uid ?? ""], member: [user.uid ?? ""]}
      }

      const teamResult = await admin.firestore().collection("/teams").add(team);

      const data = {
        teamId: teamResult.id,
      };

      const result = await testEndpoint(data);
      assert.equal(result.data.name, teamName);
    });
  })
});

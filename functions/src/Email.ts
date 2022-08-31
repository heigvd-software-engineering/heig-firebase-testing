import {Team} from "./Team";
import * as sendgrid from "@sendgrid/mail";

export interface Email {
  emailInformation(team: Team): void;
}

export class TestModeEmail implements Email {
  emailInformation(): void {
    // no-op or stub or whatever
  }
}

export class SendgridEmail implements Email {
  emailInformation(team: Team): void {
    const apiKey: string = process.env.SENDGRID_API_KEY ?? "";
    sendgrid.setApiKey(apiKey);

    const msg = {
      to: ["me@example.com"],
      from: "cloud-function@mySuperCoolDomainName.ch",
      subject: "We have a new Team!",
      html: `
<h1>New Team: ${team.name}</h1>

<p>Whatever you want to put in the email</p>
`,
    };

    sendgrid.send(msg).catch((err) => {
      console.error(err);
    });
  }
}

export interface User {
  uid: string | null
  name: string | null
  email: string
  password: string
  token: string,
}

export const user: User = {
  email: "user@email.com",
  password: "thisIsMyFakePassword1234%$",
  name: "Test user",
  uid: "myUid",
  token: "",
};

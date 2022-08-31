/**
 * This team is the same as the one from the test rules.
 *
 * Of course, you set up your project in a way to share data, but I will leave
 * this exercise up to you.
 */
export interface Team {
  name: string
  roles: {
    member: string[]
    admin: string[]
  }
}

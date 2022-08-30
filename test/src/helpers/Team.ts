export interface Team {
  name: string
  roles: {
    member: string[]
    admin: string[]
  }
}

export function getTeam(
  name: string,
  members: string[] = [],
  admins: string[] = [],
): Team {
  return {
    name: name,
    roles: {
      member: members,
      admin: admins,
    },
  };
}

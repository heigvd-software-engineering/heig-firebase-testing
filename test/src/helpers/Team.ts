export interface Team {
  name: string,
}

export function getTeam(
  name: string,
): Team {
  return {
    name: name
  };
}

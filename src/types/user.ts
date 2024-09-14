export default interface User {
  id: number;
  teamid: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserForm {
  nickname?: string;
  image?: string;
}

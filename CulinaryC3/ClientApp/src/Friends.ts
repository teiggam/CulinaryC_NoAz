
export interface Friends {
  id: number;
  loginId: string;
  name: string;
  score: number;
  title: string;
  picture: null | string;
  favorite: any[];
  friends: any[];
  group: any[];
  recipes: any[];
}

export interface Friends2 {
  userId: number;
  friendId: number;
}


export interface User {
  id: number;
  loginId: string;
  name: string;
  score: number;
  title: string;
  picture: string;
  favorite: any[];
  friends: any[];
  group: any[];
  recipes: any[];
  password: string;
}

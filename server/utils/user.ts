export interface User {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  preferences: string[];
  liked_posts: string[];
}

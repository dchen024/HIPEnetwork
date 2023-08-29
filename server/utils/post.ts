import { db } from '../mongodb';
import { ObjectId } from 'mongodb';

export interface Post {
  title: string;
  body: string;
  author: string;
  timestamp: string;
  category?: string;
  author_id: ObjectId;
  author_image: string;
  _id: string;
  is_author: boolean;
  is_liked: boolean;
  like_count: number;
}

export async function withUser(post: Post) {
  return await db
    .collection('users')
    .findOne({ _id: post!.author_id })
    .then((user) => {
      return { ...post, author_image: user!.image };
    })
    .catch(() => post);
}

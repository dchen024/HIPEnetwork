import { db } from '../../mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from '#auth';
import { authOptions } from '../auth/[...]';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;
  const usersCollection = db.collection('users');
  const session = await getServerSession(event, authOptions);
  const currentUser = await usersCollection.findOne({ email: session?.user?.email });

  if (ObjectId.isValid(id)) {
    return await db
      .collection('posts')
      .findOne({ _id: new ObjectId(id) })
      .then(async (post) => {
        return usersCollection
          .findOne({ _id: post!.author_id })
          .then((user) => {
            return {
              ...post,
              author_image: user!.image,
              is_author: user!._id.toString() === currentUser?._id.toString(),
              is_liked: currentUser!.liked_posts.includes(post!._id.toString()),
            };
          })
          .catch(() => post);
      })
      .catch(() =>
        createError({
          statusMessage: 'Could not fetch the document',
          statusCode: 500,
        })
      );
  }
  return createError({
    statusMessage: 'Not a valid Objectid',
    statusCode: 500,
  });
});

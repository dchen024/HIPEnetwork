import { db } from './../mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from '#auth';
import { authOptions } from './auth/[...]';

export default defineEventHandler(async (event) => {
  const { post_id } = await readBody(event);
  const session = await getServerSession(event, authOptions);

  if (!session)
    return createError({
      statusMessage: 'user is not logged in',
      statusCode: 401,
    });

  const alreadyLiked = await db.collection('users').findOne({
    email: session?.user?.email,
    liked_posts: {
      $in: [post_id],
    },
  });

  console.log(alreadyLiked);

  await db
    .collection('posts')
    .findOneAndUpdate(
      { _id: new ObjectId(post_id) },
      { $inc: { like_count: alreadyLiked ? -1 : 1 } }
    );

  await db
    .collection('users')
    .findOneAndUpdate(
      { email: session?.user?.email },
      alreadyLiked ? { $pull: { liked_posts: post_id } } : { $push: { liked_posts: post_id } }
    )
    .catch(() =>
      createError({
        statusMessage: 'Could not update user likes',
        statusCode: 500,
      })
    );
});

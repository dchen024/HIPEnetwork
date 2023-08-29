import { db } from '../../mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '../auth/[...]';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  const id = getRouterParam(event, 'id')!;
  const user = await db.collection('users').findOne({ email: session?.user?.email });

  const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });

  if (post!.author_id.toString() !== user!._id.toString()) {
    return createError({
      statusMessage: 'session does not match post author',
      statusCode: 401,
    });
  }

  if (ObjectId.isValid(id)) {
    return await db
      .collection('posts')
      .deleteOne({ _id: new ObjectId(id) })
      .catch(() =>
        createError({
          statusMessage: 'Could not delete document',
          statusCode: 400,
        })
      );
  }
});

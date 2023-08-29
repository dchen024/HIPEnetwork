import { db } from '../mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from '#auth';
import { authOptions } from './auth/[...]';

export default defineEventHandler(async (event) => {
  const { preferences } = await readBody(event);
  const session = await getServerSession(event, authOptions);

  if (!session)
    return createError({
      statusMessage: 'user is not logged in',
      statusCode: 401,
    });

  return await db
    .collection('users')
    .findOneAndUpdate({ email: session?.user?.email }, { $set: { preferences: preferences } })
    .catch(() =>
      createError({
        statusMessage: 'Could not update user preferences',
        statusCode: 500,
      })
    );
});

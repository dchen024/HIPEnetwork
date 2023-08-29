import { db } from '../mongodb';
import { getServerSession } from '#auth';
import { authOptions } from './auth/[...]';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  if (!session)
    return createError({
      statusMessage: 'user is not logged in',
      statusCode: 401,
    });

  return await db
    .collection('users')
    .findOne({ email: session?.user?.email })
    .catch(() =>
      createError({
        statusMessage: 'Could not find user',
        statusCode: 500,
      })
    );
});

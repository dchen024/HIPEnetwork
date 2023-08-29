import { db } from '../../mongodb';
import { query } from '../../recommendation';
import { getServerSession } from '#auth';
import { authOptions } from '../auth/[...]';

const categories = ['internship', 'job', 'research', 'mentorship'];
//* scholarship, fellowship, workshop, networking, events, study abroad, non-profit

export default defineEventHandler(async (event) => {
  const post = await readBody(event);

  if (!post.body || !post.title)
    return createError({
      statusMessage: 'Post cannot be empty',
      statusCode: 400,
    });
  const date = new Date();
  const usersCollection = db.collection('users');
  const session = await getServerSession(event, authOptions);
  const currentUser = await usersCollection.findOne({ email: session?.user?.email });

  post.timestamp = date.toISOString();

  return await query({
    inputs: post.title + '\n' + post.body,
    parameters: { candidate_labels: categories },
  })
    .then(async (response) => {
      const category = response.labels[0]; // gets most relevant category
      post.category = category;
      post.author_id = currentUser?._id;

      setResponseStatus(event, 201);
      return await db.collection('posts').insertOne(post);
    })
    .catch(() =>
      createError({
        statusMessage: 'Could not create a new document',
        statusCode: 500,
      })
    );
});

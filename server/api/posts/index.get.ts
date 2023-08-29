import { Post, withUser } from '~/server/utils/post';
import { db } from '../../mongodb';
import { getServerSession } from '#auth';
import { authOptions } from '../auth/[...]';

const categoryTypes = [
  'internship',
  'job',
  'research',
  'mentorship',
  'scholarship',
  'workshop',
  'study-abroad',
];
//* scholarship, fellowship, workshop, networking, events, study-abroad, non-profit

export default defineEventHandler(async (event) => {
  const { p, categories } = getQuery(event);

  const page = parseInt(p as string) || 0;
  const booksPerPage = 3;

  let categoryFilter = categories
    ? { $or: (categories as string).split(',').map((category) => ({ category })) }
    : {};
  const usersCollection = db.collection('users');
  const session = await getServerSession(event, authOptions);
  const currentUser = await usersCollection.findOne({ email: session?.user?.email });

  return await db
    .collection('posts')
    .find()
    .filter(categoryFilter)
    .sort({ timestamp: -1 })
    // .skip(page * booksPerPage)
    // .limit(0)
    .toArray()
    .then(async (posts) => {
      return await Promise.all(
        posts.map((post) => {
          return usersCollection
            .findOne({ _id: post!.author_id })
            .then((user) => {
              return {
                ...post,
                author_image: user!.image,
                is_author: user!._id.toString() === currentUser?._id.toString(),
                is_liked: currentUser!.liked_posts.includes(post._id.toString()),
              };
            })
            .catch(() => post);
        })
      );
    })
    .catch(() =>
      createError({
        statusMessage: 'Could not fetch the documents',
        statusCode: 500,
      })
    );
});

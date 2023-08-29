import { db } from './mongodb';

interface Query {
  sequence: string;
  labels: string[];
  scores: number[];
}

export async function query(data: any): Promise<Query> {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
    {
      headers: {
        Authorization: `Bearer ${process.env.NUXT_HUGGINGFACE_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export async function recommend(category?: string) {
  let page = 0;
  const booksPerPage = 5;
  let categoryFilter;

  if (category) {
    categoryFilter = { category };
  } else {
    categoryFilter = {};
  }

  try {
    const posts = await db
      .collection('posts')
      .find()
      .filter(categoryFilter)
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .sort({ timestamp: -1 })
      .toArray();

    return { posts };
  } catch {
    return { error: 'Could not fetch the documents' };
  }
}

// EXAMPLE
// const response = await query({"inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
//   "parameters": {"candidate_labels": ["refund", "legal", "faq"]}});

// console.log(response);

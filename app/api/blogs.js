import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'POST') {
    const { title, slug, date, author, image, content } = req.body;

    if (!title || !slug || !date || !author || !image || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPost = {
      title,
      slug,
      date,
      author,
      image,
      content,
    };

    const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
    const fileContent = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author}"
image: "${image}"
---

${content}
`;

    try {
      fs.writeFileSync(filePath, fileContent);
      return res.status(201).json({ message: 'Blog post added successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add blog post.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
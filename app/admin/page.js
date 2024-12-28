"use client";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminPage = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session || session.user.role !== 'admin') {
        router.push('/login');
      } else {
        setSession(session);
      }
    };

    fetchSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !date || !author || !image || !content) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug, date, author, image, content }),
      });

      if (res.ok) {
        setTitle('');
        setSlug('');
        setDate('');
        setAuthor('');
        setImage('');
        setContent('');
        setError('');
        setSuccess('Blog post added successfully!');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add blog post.');
      }
    } catch (error) {
      setError('Failed to add blog post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isSubmitting ? 'Submitting...' : 'Add Blog Post'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
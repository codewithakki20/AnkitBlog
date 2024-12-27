import fs from "fs";
import matter from 'gray-matter';

export const fetchTopBlogs = () => {
  const dirContent = fs.readdirSync("content", "utf-8");
  const blogs = dirContent.map(file => {
    const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
    const { data } = matter(fileContent);
    return data;
  });
  return blogs.slice(0, 3); // Get the top 3 blogs
};
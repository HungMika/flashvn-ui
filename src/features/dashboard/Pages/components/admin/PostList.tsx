'use client';

import React from 'react';
import { PostType } from '@/types/post'; // Nhớ tạo và import đúng file type

interface PostListProps {
  posts: PostType[];
  onEdit: (post: PostType) => void;
  onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="container mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Posts</h2>

      {/* Hiển thị thông báo nếu không có bài viết */}
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="border p-4 mb-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
            <p className="mb-2 text-gray-700">{post.content}</p>

            {/* Hiển thị ảnh nếu có */}
            {post.image && (
              <img
                src={`/${post.image}`}
                alt={post.title}
                className="mb-3 w-full max-h-64 object-cover rounded-lg shadow"
              />
            )}

            <div className="text-sm text-gray-600 mb-2">
              <p>Category: {post.category}</p>
              <p>Visible: {post.bool ? 'Yes' : 'No'}</p>
              <p>
                Created:{' '}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>

            <div>
              <button
                onClick={() => onEdit(post)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post._id!)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

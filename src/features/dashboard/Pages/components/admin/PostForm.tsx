'use client';

import React from 'react';
import { PostType } from '@/types/post'; // Hoặc import chính xác đường dẫn chứa PostType

interface Props {
  post: PostType;
  onChange: (post: PostType) => void;
  onSubmit: () => void;
}

const PostForm = ({ post, onChange, onSubmit }: Props) => {
  return (
    <div className="mb-6 bg-white p-6 rounded text-black shadow">
      <h2 className="text-xl font-bold mb-4">
        {post._id ? 'Edit Post' : 'Create New Post'}
      </h2>

      {/* Title */}
      <label className="block mb-1 font-semibold">Title</label>
      <input
        type="text"
        value={post.title}
        onChange={(e) => onChange({ ...post, title: e.target.value })}
        className="border p-2 mb-3 w-full"
      />

      {/* Content */}
      <label className="block mb-1 font-semibold">Content</label>
      <textarea
        value={post.content}
        onChange={(e) => onChange({ ...post, content: e.target.value })}
        className="border p-2 mb-3 w-full"
      />

      {/* Image */}
      <label className="block mb-1 font-semibold">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            onChange({ ...post, image: file }); // lưu file thay vì base64
          }
        }}
        className="border p-2 mb-3 w-full"
      />

      {/* Hiển thị ảnh nếu có */}
      {post.image && (
        <img
          src={typeof post.image === 'string' ? post.image : URL.createObjectURL(post.image)}
          alt="Preview"
          className="w-32 h-auto mt-2"
        />
      )}

      {/* Category */}
      <label className="block mb-1 font-semibold">Category</label>
      <select
        value={post.category}
        onChange={(e) =>
          onChange({ ...post, category: e.target.value as PostType['category'] })
        }
        className="border p-2 mb-3 w-full"
      >
        <option value="educator">Educator</option>
        <option value="youth">Youth</option>
        <option value="digcomp">DigComp</option>
        <option value="other">Other</option>
      </select>

      {/* Date */}
      <label className="block mb-1 font-semibold">Date</label>
      <input
        type="date"
        value={post.date ? post.date : ''}
        onChange={(e) => onChange({ ...post, date: e.target.value })}
        className="border p-2 mb-3 w-full"
      />

            {/* Bool */}
      <label className="block mb-1 font-semibold">Tick</label>
      <input
        type="checkbox"
        checked={post.bool}
        onChange={(e) => onChange({ ...post, bool: e.target.checked })}
        className="mb-4"
      />{' '}
      <span>{post.bool ? 'Tick' : 'NoTick'}</span>

      <div>
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {post._id ? 'Save Changes' : 'Create Post'}
        </button>
      </div>
    </div>
  );
};

export default PostForm;

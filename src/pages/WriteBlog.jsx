import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  const handleSubmitForm = () => {
    // Logic to handle form submission
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex flex-col items-start text-white p-4 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-bold my-2">Write Experience</h1>
      <div className="w-full lg:w-70 md:w-4/5 text-left bg-green-500 p-6 mt-2">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description (Markdown content)
          </label>
          {!preview ? (
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              rows="10"
              value={description}
              onChange={handleDescriptionChange}
            />
          ) : (
            <div className="bg-gray-100 text-black w-full p-4 rounded">
              <ReactMarkdown
                children={description}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          )}
          <div className="flex justify-between my-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={togglePreview}
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmitForm}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;

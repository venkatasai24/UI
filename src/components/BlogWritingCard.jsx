import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogWritingCard = ({
  from = "",
  preview,
  blog,
  handleInputChange,
  togglePreview,
  handleSubmitForm,
  saving,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title" // Added name attribute
          placeholder="Enter title"
          value={blog.title}
          onChange={handleInputChange}
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
            name="description" // Added name attribute
            placeholder="Enter description"
            rows="10"
            value={blog.description}
            onChange={handleInputChange}
          />
        ) : (
          <div className="bg-gray-100 text-black w-full p-4 rounded">
            <ReactMarkdown
              children={blog.description}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
        <div className="flex justify-between my-2">
          <button
            type="button" // Changed to button type
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={togglePreview}
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            type="button" // Changed to button type
            className={`${
              from === "EditBlogPage"
                ? "bg-green-500 hover:bg-green-700"
                : "bg-yellow-500 hover:bg-yellow-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={handleSubmitForm}
            disabled={from === "EditBlogPage" && saving}
          >
            {from === "EditBlogPage"
              ? saving
                ? "Saving..."
                : "Update"
              : "Post"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogWritingCard;

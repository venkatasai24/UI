import { AiOutlineTags } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const TagAndCategory = ({ blog }) => {
  return (
    <>
      <div className="mt-2 flex items-center">
        {blog?.categories?.length !== 0 && (
          <>
            <BiCategoryAlt className="mr-2 text-teal text-sm" />
            {blog.categories.map((category, index) => (
              <Link
                to={`/categories/${category}`}
                className="text-indigo hover:underline mr-1 text-sm"
              >
                {category}
                {index !== blog.categories.length - 1 && ","}
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="flex items-center">
        {blog?.tags?.length !== 0 && (
          <>
            <AiOutlineTags className="mr-2 text-teal text-sm" />
            {blog.tags.map((tag, index) => (
              <Link
                to={`/tags/${tag}`}
                className="text-indigo hover:underline mr-1 text-sm"
              >
                {tag}
                {index !== blog.tags.length - 1 && ","}
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TagAndCategory;
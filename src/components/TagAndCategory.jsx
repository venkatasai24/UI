import { AiOutlineTags } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const TagAndCategory = ({ blog }) => {
  return (
    <>
      <div className="mt-4 flex items-start">
        {blog?.categories?.length !== 0 && (
          <div className="flex items-start">
            <BiCategoryAlt className="mr-2 mt-1 text-teal text-sm flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {blog.categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/categories/${category}`}
                  className="text-indigo hover:underline text-sm"
                >
                  {category}
                  {index !== blog.categories.length - 1 && ","}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-start">
        {blog?.tags?.length !== 0 && (
          <div className="flex items-start">
            <AiOutlineTags className="mr-2 mt-1 text-teal text-sm flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {blog.tags.map((tag, index) => (
                <Link
                  to={`/tags/${tag}`}
                  className="text-indigo hover:underline text-sm"
                >
                  {tag}
                  {index !== blog.tags.length - 1 && ","}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TagAndCategory;

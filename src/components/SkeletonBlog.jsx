import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonBlog = ({ from }) => {
  return (
    <SkeletonTheme baseColor="teal" highlightColor="#ffffff">
      {from !== "profile" && (
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          <Skeleton width="70%" />
        </h1>
      )}
      <p className="text-lg mb-4 whitespace-pre-line">
        <Skeleton
          count={from === "ReadBlogs" ? 2 : from === "profile" ? 3 : 5}
        />
      </p>
      {from !== ("ReadBlogs" && "profile") && (
        <p className="text-sm mt-4 font-bold">
          <Skeleton width="30%" />
        </p>
      )}
    </SkeletonTheme>
  );
};

export default SkeletonBlog;

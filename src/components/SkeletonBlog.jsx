import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonBlog = ({ from }) => {
  return (
    <SkeletonTheme baseColor="rgb(34 197 94)" highlightColor="#ffffff">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4">
        <Skeleton width="70%" />
      </h1>
      <p className="text-lg mb-4 whitespace-pre-line">
        <Skeleton count={from === "ReadBlogs" ? 2 : 5} />
      </p>
      {from !== "ReadBlogs" && (
        <p className="text-sm mt-4 font-bold">
          <Skeleton width="30%" />
        </p>
      )}
    </SkeletonTheme>
  );
};

export default SkeletonBlog;

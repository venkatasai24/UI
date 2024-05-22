const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        className="h-10 w-10 text-white"
        viewBox="0 0 100 100"
        fill="#2563eb"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" stroke="#a855f7" strokeWidth="4" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="50"
          fill="white"
          fontFamily="Nunito Sans"
        >
          UI
        </text>
      </svg>
    </div>
  );
};

export default Logo;

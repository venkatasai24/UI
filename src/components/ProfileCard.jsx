const ProfileCard = ({ userData }) => {
  return (
    <div className="bg-green-500 text-white shadow-md p-4 m-2 overflow-auto">
      <p className="text-xl mb-2">
        <strong>Name :</strong> {userData.name}
      </p>
      <p className="text-xl mb-2">
        <strong>Email :</strong> {userData.email}
      </p>
      <p className="text-xl mb-4">
        <strong>Joined on </strong>{" "}
        {new Date(userData.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProfileCard;

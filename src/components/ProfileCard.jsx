import { useState } from "react";

const ProfileCard = ({ userData, from, handleSubmit }) => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    name: userData.name,
    email: userData.email,
  });

  const toggleEdit = () => {
    if (edit === true) {
      setUser({
        name: userData.name,
        email: userData.email,
      });
    }
    setEdit(!edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="bg-white bg-opacity-30 rounded-lg shadow-lg text-white shadow-md p-4 m-2 overflow-auto break-words">
      <div className="text-xl mb-2">
        {edit ? (
          <input
            name="name"
            type="text"
            value={user.name}
            onChange={handleChange}
            className="text-black focus:outline-none border-none w-full"
            required
          />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div className="text-xl mb-2">
        {edit ? (
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            className="text-black focus:outline-none border-none w-full"
            required
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <p className="text-md mb-2">
        <strong>Joined on </strong>{" "}
        {new Date(userData.createdAt).toLocaleDateString()}
      </p>
      {from === "ProfilePage" && (
        <>
          <button className="mr-4 text-sm" onClick={toggleEdit}>
            {edit ? "Cancel" : "Edit"}
          </button>
          {edit && (
            <button
              className="text-sm"
              onClick={(e) => {
                handleSubmit(e, user);
                toggleEdit();
              }}
            >
              Save
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCard;

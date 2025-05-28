import axios from "axios";

const saveUser = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/${user.email}`,
    {
      email: user?.email,
      name: user?.name,
      role: "customer",
      photo: user?.photoUrl,
    },
  );
  return data;
};

export const extractFields = (user) => {
  return {
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    avatar_url: user.avatar_url,
  };
};

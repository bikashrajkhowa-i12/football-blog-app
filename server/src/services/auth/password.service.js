import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

import * as bcrypt from 'bcrypt';

export const hash = async (password: string, saltOrRounds = 10) => {
  return await bcrypt.hash(password, saltOrRounds);
};

import jwt from 'jsonwebtoken';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',  // Token valid for 30 days
  });
};

export default generateToken;

import bcrypt from 'bcryptjs';
import User from '../../models/User';

export const userRepository = {
  create,
  update,
  getPlaidAccessTokenById,
};

async function create(params) {
  const { email, name, password } = params;
  const saltRounds = 10;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new Error(`Server error`);
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
}

async function update(id, params) {
  const user = await User.findById(id);
  try {
    if (!user) new Error(`User not found`);

    if (user._id.toString() !== id && (await User.findOne({ _id: id }))) {
      throw new Error(`Error updating the user`);
    }

    Object.assign(user, params);
    await user.save();
    console.log('User was updated');
  } catch (error) {
    throw new Error(`Update error`);
  }
}

async function getPlaidAccessTokenById(id) {
  const user = await User.findById(id);
  return user.plaidAccessToken;
}

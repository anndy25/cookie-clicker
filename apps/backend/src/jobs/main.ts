import { Request, Response } from 'express';
import { User } from '../models/userModel';

// Increment counter and handle rewards
export const incrementCounter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId }: { userId: string } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      user = new User();
      await user.save();
    }

    const random = Math.random();
    if (random < 0.5) {
      user.counter += 10;
    } else {
      user.counter += 1;
    }

    if (random < 0.25) {
      user.rewards += 1;
    }

    await user.save();

    res.status(200).json({ counter: user.counter, rewards: user.rewards });
  } catch (error) {
    res.status(500).json({ error: 'Error incrementing counter' });
  }
};

// Fetch user data
export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res
      .status(200)
      .json({ counter: user.counter, rewards: user.rewards, _id: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
};

export const createOrGetUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(200).json({
        userId: user._id,
        username: user.username,
      });
    }

    // Create new user
    user = new User({ username });
    await user.save();

    return res.status(201).json({
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error('Error creating/getting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

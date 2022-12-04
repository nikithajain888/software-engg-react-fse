import {userTogglesTuitDislikes} from "../services/dislikes-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import {
  findTuitById,
  createTuit
} from "../services/tuits-service";

describe('user toggles dislikes button', () => {

  const ellen = {
    username: 'ellen_ripley',
    password: 'ellen_ripley',
    email: 'ellen_ripley@test.com'
  };


  beforeAll(() => {
    return deleteUsersByUsername(ellen.username);
  })

  afterAll(() => {

    return deleteUsersByUsername(ellen.username);
  })

  test('user can dislike and remove dislike for a tuit', async () => {
    
    const newUser = await createUser(ellen);
    const newTuit = {
      tuit: 'This is a test tuit to be created.',
      postedBy: String(newUser._id)
    }
    const testing = await createTuit(newUser._id, newTuit);
    const dislike = await findTuitById(testing._id);
    await userTogglesTuitDislikes(newUser._id, testing._id);
    expect(dislike.stats.dislikes).toEqual(0);
    await userTogglesTuitDislikes(newUser._id, testing._id);
  });
});

import {userTogglesTuitLikes} from "../services/likes-service";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import {
  findTuitById,
  createTuit
} from "../services/tuits-service";

describe('user toggles likes button', () => {

  const ellen1 = {
    username: 'ellen_ripley1',
    password: 'ellen_ripley1',
    email: 'ellen_ripley1@test.com'
  };


  beforeAll(() => {
   
    return deleteUsersByUsername(ellen1.username);
  })

  afterAll(() => {

    return deleteUsersByUsername(ellen1.username);
  })

  test('user can like and remove like for a tuit', async () => {
    const newUser = await createUser(ellen1);
    
    const newTuit = {
      tuit: 'This is a test tuit to be created.',
      postedBy: String(newUser._id)
    };

    const testing = await createTuit(newUser._id, newTuit);
    const like = await findTuitById(testing._id);
    await userTogglesTuitLikes(newUser._id, testing._id);
    expect(like.stats.likes).toEqual(0);
    await userTogglesTuitLikes(newUser._id, testing._id);

  });
});

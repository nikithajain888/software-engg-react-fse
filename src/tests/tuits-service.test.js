import {
  createTuit,
  updateTuit, deleteTuit,findAllTuits, findTuitById,findTuitByUser
} from "../services/tuits-service";

import{
  createUser, deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  const mockUser1 = {
    username: 'mockUser',
    password: 'mockUser1',
    email: 'mockUser@aliens.com'
  };
  const tuit_msg = {
    tuit: 'Hello, this is a test tuit by ripley',
  };
  // Setup test before running test
  beforeAll(() => {
    // remove any/all tuits to make sure we create it in the test
    deleteUsersByUsername(mockUser1.username);
    return deleteTuitsByTuit(tuit_msg.tuit);
  })

  // Clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteUsersByUsername(mockUser1.username);
    return deleteTuitsByTuit(tuit_msg.tuit);
  })
  test('insert tuit using REST API', async () => {
    //Insert new tuit
    const user = await createUser(mockUser1);
    const tuit = await createTuit(user._id, tuit_msg);
    expect(tuit.tuit).toEqual(message.tuit);
    expect(tuit.postedBy).toEqual(user._id);
  });
});

// describe('can delete tuit wtih REST API', () => {
//   // TODO: implement this
// });

// describe('can retrieve a tuit by their primary key with REST API', () => {
//   // TODO: implement this
// });

// describe('can retrieve all tuits with REST API', () => {
//   // TODO: implement this
// });


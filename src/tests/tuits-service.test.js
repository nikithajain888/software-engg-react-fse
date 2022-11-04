
import {
  createTuit, deleteTuit, findAllTuits, findTuitById, findTuitByUser
} from "../services/tuits-service";

import {
  createUser, deleteUsersByUsername
} from "../services/users-service";

const mockUser1 = {
  username: 'mockUser',
  password: 'mockUser1',
  email: 'mockUser@aliens.com'
};
let newUser;
// Setup test before running test
beforeAll(async () => {
  newUser = await createUser(mockUser1);
}
)

afterAll(
  () => {
    return deleteUsersByUsername(mockUser1.username);
  }
)

describe('can create tuit with REST API, createTuit', () => {
  const msg_create = {
    tuit: 'This is a test tuit to be created.',
    postedBy: '635986a0bf48885e53c27ba7'
  }
  let tuitId;
  let create_Tuit;

  // setup test before running test
  beforeAll(async () => {
    create_Tuit = await createTuit(msg_create.postedBy, msg_create);
  })

  // clean up after test runs
  afterAll(() =>
  // remove any data we created
  {
    return deleteTuit(tuitId);
  });

  test('can create tuit with REST API', async () => {
    tuitId = create_Tuit._id;
    expect(create_Tuit.postedBy).toEqual(msg_create.postedBy);
    expect(create_Tuit.tuit).toEqual(msg_create.tuit);
  })
});

describe('can delete tuit with REST API, deleteTuit', () => {
  const msg_delete = {
    tuit: 'Delete this tuit. CS5500 FSE.',
    postedBy: '635986a0bf48885e53c27ba7'
  }
  let tuitId;
  let delete_Tuit;
  beforeAll(async () => {
    delete_Tuit = await createTuit(msg_delete.postedBy, msg_delete);
  })
  // clean up after test runs
  afterAll(() =>
  // remove any data we created
  {
    return deleteTuit(tuitId);
  }
  )
  test('can delete tuit with REST API', async () => {
    tuitId = delete_Tuit._id;
    expect(delete_Tuit.postedBy).toEqual(msg_delete.postedBy);
    expect(delete_Tuit.tuit).toEqual(msg_delete.tuit);
    const status = await deleteTuit(delete_Tuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1)
  })
});



describe('can retrieve tuit with REST API, findTuitById', () => {
  const msg_tuit = {
    tuit: 'This is a test tuit. This will be retrieved.',
    postedBy: '635986a0bf48885e53c27ba7'
  }
  let tuitId;
  let retrieveTuit;
  beforeAll(async () => {
    retrieveTuit = await createTuit(msg_tuit.postedBy, msg_tuit);
  })
  afterAll(() => {
    return deleteTuit(tuitId);
  })
  test('can retrieve tuit with REST API', async () => {
    tuitId = retrieveTuit._id;
    expect(retrieveTuit.postedBy).toEqual(msg_tuit.postedBy);
    expect(retrieveTuit.tuit).toEqual(retrieveTuit.tuit);
    const existingTuit = await findTuitById(tuitId);
    expect(existingTuit.tuit).toEqual(msg_tuit.tuit);
    expect(existingTuit.postedBy._id).toEqual(retrieveTuit.postedBy)
  })
});



describe('can retrieve all tuits with REST API', () => {
  let test_user_id = '635986a0bf48885e53c27ba7';
  let testArrayTuits = [{
    tuit: 'FSE11',
    postedBy: test_user_id
  }, {
    tuit: 'FSE22',
    postedBy: test_user_id
  }, {
    tuit: 'FSE33',
    postedBy: test_user_id
  }]
  beforeAll(async () => {
    return Promise.all(
      testArrayTuits.map(
        myTuit =>
          createTuit(myTuit.postedBy, myTuit)));
  });
  afterAll(async () => {
    const testingInsertedTuits = await findTuitByUser(test_user_id);
    return Promise.all(testingInsertedTuits.map(tuit => deleteTuit(tuit._id)));
  });
  test('can retrieve all tuits with REST API', async () => {
    const tuits_all = await findAllTuits();
    expect(tuits_all.length).toBeGreaterThanOrEqual(testArrayTuits.length);
    const tuitsWeInserted = tuits_all.filter(x => testArrayTuits.some(myTuit => myTuit.tuit === x.tuit));
    expect(tuitsWeInserted.length).toEqual(testArrayTuits.length);
    tuitsWeInserted.forEach(myTuit => {
      const tuitContent=testArrayTuits.find(
        (tuitContent)=>tuitContent.tuit ===myTuit.tuit
      )
      expect(myTuit.postedBy._id).toEqual(test_user_id)
    })

  })
});


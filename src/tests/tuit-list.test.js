import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  {username: 'userTest', _id:'63598a31bf48885e53c27bd1'},
  {username: 'Testing', _id:'635986a0bf48885e53c27ba7'}
];

const MOCKED_TUITS = [
  {tuit: "test1tuit12345",postedBy:'userTest', _id:"6366b4b435af7af316808f20"},
  {tuit: "testtuit",postedBy:'Testing',  _id:"6365867335af7af316808ed9"}
];


// test tuit list renders static tuit array
test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  );

  const linkElementA = screen.getByText(/test1tuit12345/i);
  const linkElementB = screen.getByText(/testtuit/i);
  expect(linkElementA).toBeInTheDocument();
  expect(linkElementB).toBeInTheDocument();
});


test('tuits list renders mocked', async () => {
  axios.get.mockImplementation(() =>
  Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);

  const tuit = screen.getByText(/testtuit/i);
  expect(tuit).toBeInTheDocument();
});

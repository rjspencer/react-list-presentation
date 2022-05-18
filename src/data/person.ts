import Chance from "chance";

const chance = new Chance();

export interface Person {
  id: string;
  first: string;
  last: string;
  age: number;
  email: string;
  city: string;
  zip: string;
  address: string;
  state: string;
  favoriteColor: string;
}

export const generatePerson = (): Person => {
  return {
    id: chance.guid(),
    first: chance.first(),
    last: chance.last(),
    age: chance.age(),
    email: chance.email(),
    zip: chance.zip(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    favoriteColor: chance.color({ format: "hex" }),
  };
};

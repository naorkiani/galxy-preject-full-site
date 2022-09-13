const Card = require("../routes/Cards/cardModel");
const user = require("../model/userModel");
const { createHash } = require("../config/bcrypt");
const { card } = require("joi");

const data = {
  users: [
    {
      name: "user",
      email: "user@gmail.com",
      password: "123456",
      isAdmin: false,
    },
    {
      name: "user2",
      email: "user2@gmail.com",
      password: "123456",
      isAdmin: false,
    },
    {
      name: "admin",
      email: "admin@gmail.com",
      password: "123456",
      isAdmin: true,
    },
    {
      name: "benny",
      email: "benny@gmail.com",
      password: "1234556",
      isAdmin: false,
    },
  ],
  Card: [
    {
      title: "Flight on 1 september",
      Flight: "speasx",
      description: "bala bla text text",
      addressLaunch: "NASA texas",
      phone: "0101 2344 333",
      image: {
        url: "https://cdn.mos.cms.futurecdn.net/Rrfa4oEWQHekzXPW7K58fj.jpg",
        alt: "sasa",
      },
      bizNumber: "10000",
      Flightdate: "1.9.28",
      likes: [],
    },
    {
      title: "Flight on 4 october",
      Flight: "xiom",
      description: "bala bla text text",
      addressLaunch: "NASA new york",
      phone: "0101 2344 222",
      image: {
        url: "https://cdn.mos.cms.futurecdn.net/Rrfa4oEWQHekzXPW7K58fj.jpg",
        alt: "sasa",
      },
      bizNumber: "10030",
      Flightdate: "4.10.29",
      likes: [],
    },
    {
      title: "Flight on 2 june",
      Flight: "speasx",
      description: "bala bla text text",
      addressLaunch: "NASA ",
      phone: "0101 2344 363",
      image: {
        url: "https://cdn.mos.cms.futurecdn.net/Rrfa4oEWQHekzXPW7K58fj.jpg",
        alt: "sasa",
      },
      bizNumber: "10010",
      Flightdate: "1.9.26",
      likes: [],
    },
  ],
};
async function primaryUsers(users) {
  try {
    user = new User(users);
    user.password = createHash(users.password);
    await user.save();
  } catch (error) {
    console.log(error.message);
  }
}
async function primaryCards(card) {
  try {
    Card = new Card(card);
    await Card.save();
  } catch (error) {
    console.log(error.message);
  }
}

const primaryData = () => {
  for (let i of data.users) {
    primaryUsers(i);
  }
  for (let i of data.Card) {
    primaryCards(i);
  }
};

module.exports = primaryData;

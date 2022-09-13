const { Card } = require("./cardModel");
const express = require("express");
const auth = require("../../meddelware/authMiddlewere");
const router = express.Router();
const chalk = require("chalk");
const { validateCard } = require("./cardValidation");

router.get("/cards", async (req, res) => {
  console.log("here");
  try {
    const cards = await Card.find();
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/myfavlanch", auth, async (req, res) => {
  try {
    const user = req.tokenData;
    const favcards = await Card.find({ likes: user.id });
    return res.send(favcards);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.get("/card/:id", async (req, res) => {
  try {
    const cardID = req.params.id;
    const card = await Card.findOne({ _id: cardID });
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user) return res.status(403).json("Un authorize user!");
    const cards = await Card.find({ user_id: user._id });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = req.tokenData;

    if (!user) {
      console.log(
        chalk.redBright("A non biz user attempted to create a card!")
      );
      return res.status(403).json("Un authorize user!");
    }

    let card = req.body;

    const { error } = validateCard(card);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    // const newCard = new Card({
    //   title: card.title,
    //   Flight: card.Flight,
    //   description: card.description,
    //   addressLaunch: card.addressLaunch,
    //   phone: card.phone,
    //   image: {
    //     url: card.url
    //       ? card.url
    //       : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    //     alt: card.alt ? card.alt : "Pic Of  Card",
    //   },
    //   Flightdate: card.Flightdate,
    //   bizNumber: await generateBizNum(),
    //   user_id: user._id,
    // });
    const randomNum = Math.random(Math.floor() * 1000000000);
    const newCard = new Card({
      title: card.title,
      flight: card.flight,
      description: card.description,
      addressLaunch: card.addressLaunch,
      phone: card.phone,
      image: {
        url: card.url
          ? card.url
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: card.alt ? card.alt : "Pic Of  Card",
      },
      Flightdate: card.Flightdate,
      bizNumber: randomNum,
      user_id: user.id,
    });

    await newCard.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

/********** סעיף 11 **********/
router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) {
      console.log(
        chalk.redBright("A non-admin user attempted to create a card!")
      );
      return res.status(403).json("You are not authorize to edit card!");
    }

    let card = req.body;
    delete card._id;
    const { error } = validateCard(card);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    Card = {
      title: card.title,
      Flight: card.Flight,
      description: card.description,
      addressLaunch: card.addressLaunch,
      phone: card.phone,
      image: {
        url: card.url,
        alt: card.alt,
      },
      Flightdate: card.Flightdate,
    };

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };

    card = await Card.findOneAndUpdate(filter, card);
    if (!card) {
      console.log(chalk.redBright("No card with this ID in the database!"));
      return res.status(404).send("No card with this ID in the database!");
    }
    card = await Card.findById(card._id);
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

/********** סעיף 12 **********/
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.tokenData;
    const currentCard = await Card.findById(req.params.id);

    // if (!user.isAdmin && user.id !== currentCard.user_id) {
    //   console.log(currentCard.user_id);
    //   console.log(user.id);
    //   console.log(
    //     chalk.redBright("A non-admin user attempted to create a card!")
    //   );
    //   return res.status(403).json("You are not authorize to delete this card!");
    // }

    let card = await Card.findOneAndRemove({
      _id: req.params.id,
      user_id: user.id,
    });

    if (!card) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are noe authorize to delete cards");
    }

    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delet card:", error.message));
    return res.status(500).send(error.message);
  }
});

/********** סעיף 13 **********/

router.patch("/card-like/:id", auth, async (req, res) => {
  try {
    const user = req.tokenData;
    const card = await Card.findById(req.params.id);

    const cardLikes = card.likes.find((id) => id === user.id);
    console.log(cardLikes);

    if (!cardLikes) {
      card.likes.push(user.id);
      await Card.findByIdAndUpdate(req.params.id, { likes: card.likes });
      return res.send("Card has been liked!");
    }

    card.likes = card.likes.filter((id) => id !== user.id);
    await Card.findByIdAndUpdate(req.params.id, { likes: card.likes });

    // console.log(card);

    // if (!cardLikes) {
    //   card.likes.push(user._id);
    //   card = await card.save();
    //   return res.send(card);
    // }

    // const cardFiltered = card.likes.filter((id) => id !== user._id);
    // card.likes = cardFiltered;
    // card = await card.save();
    // return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;

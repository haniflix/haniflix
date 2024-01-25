var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");
const User = require("../models/User");
//CREATE
router.post("/", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user by their email address
        // const user = await User.findOne({ email: req.body.email });
        const user = yield User.findById(req.user.id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        const myList = {
            user: user._id,
            title: req.body.title,
            content: req.body.content,
            type: req.body.type,
            genre: req.body.genre,
            adminList: user.isAdmin,
        };
        // Create a new list
        const newList = new List(myList);
        // Set the user for the new list
        newList.user = user;
        // Save the new list
        const savedList = yield newList.save();
        // Update the user's lists array with the newly created list's ObjectId
        user.lists.push(savedList._id);
        // Save the updated user
        yield user.save();
        res.status(201).json(savedList);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//UPDATE
router.put("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findById(req.user.id);
    if (user === null || user === void 0 ? void 0 : user.email) {
        try {
            // Find the user by their email address
            // const user = await User.findOne({ email: req.body.email });
            const list = yield List.findById(req.params.id);
            if (user._id == list._id || user.isAdmin) {
                const updatedList = yield List.findByIdAndUpdate(req.params.id, {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        type: req.body.type,
                        genre: req.body.genre,
                    },
                });
                return res.status(200).json(updatedList);
            }
            return res.status(401).json("Unauthorized");
            /* const myList = {
              user: user._id,
              title: req.body.title,
              content: req.body.content,
              type: req.body.type,
              genre: req.body.genre,
            };
      
            // Create a new list
            const newList = new List(myList);
      
            // Set the user for the new list
            newList.user = user;
      
            // Save the new list
            const savedList = await newList.save();
      
            // Update the user's lists array with the newly created list's ObjectId
            user.lists.push(savedList._id);
      
            // Save the updated user
            await user.save();
      
            res.status(201).json(savedList);*/
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
}));
//DELETE
router.delete("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.isAdmin) {
        try {
            yield List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been delete...");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
}));
//GET
//router.get("/", verify, async (req, res) => {
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = yield List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            }
            else {
                list = yield List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        }
        else {
            list = yield List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list.filter((l) => l.adminList));
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get("/admin-list", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const list = yield List.find({ adminList: true });
        res.status(200).json(list);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// router.get("/my-list/:email", verify,async (req, res) => {
router.get("/my-list", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        /*const user = await User.findOne({ email: req.params.email }).populate({
          path: "lists",
          populate: {
            path: "content",
            model: "Movie",
            select: "_id", // Select only the '_id' field of the Movie model
          },
        });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const userLists = user.lists.map((list) => ({
          _id: list._id,
          content: list.content.map((movie) => movie._id),
          title: list.title,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
          __v: list.__v,
        }));
    
        res.status(200).json(userLists);*/
        const user = yield User.findById(req.user.id);
        const defaultList = yield List.findOne({
            _id: user.defaultList,
            //adminList: false,
        });
        const nonDefaultLists = yield List.find({
            user: user._id,
            //adminList: false,
            _id: { $not: { $eq: user.defaultList } },
        });
        /*const nonDefaultLists = userLists?.filter(
          (list) => list._id != user.defaultList
        );*/
        // we want the default list to always come first
        res
            .status(200)
            .json([defaultList, ...nonDefaultLists].filter((list) => list != null));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/add-movie-to-default-list", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        const movieId = req.body.movieId; // Assuming you receive the movie ID from the client
        // Find the user by their email address
        const user = yield User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json("User not found");
        }
        // Find the default list associated with the user
        /*const defaultList = await List.findOne({
          user: user._id, // Match the user's ID
          title: `${user.email}'s Watchlist`, // Assuming the default list has a title "Default"
        });*/
        const createDefaultList = function (user) {
            return __awaiter(this, void 0, void 0, function* () {
                let list = new List({
                    title: `${user.username}'s Watchlist`,
                    user: user._id,
                });
                list = yield list.save();
                user.defaultList = list._id;
                yield user.save();
                return list;
            });
        };
        let defaultList;
        if (user.defaultList == null) {
            defaultList = yield createDefaultList(user);
        }
        else {
            defaultList = yield List.findOne({
                _id: user.defaultList,
                // user: user._id, // Match the user's ID
            });
        }
        if (!defaultList) {
            defaultList = yield createDefaultList(user);
            // return res.status(404).json("Default list not found for the user");
        }
        // Add the movie ID to the default list's content array
        if (!defaultList.content.includes(movieId)) {
            // only add if it is not yet in the list
            defaultList.content.push(movieId);
        }
        // Save the updated default list
        const updatedDefaultList = yield defaultList.save();
        res.status(200).json(updatedDefaultList);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
module.exports = router;

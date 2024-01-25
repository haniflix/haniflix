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
const User = require("../models/User");
const Movie = require("../models/Movie");
const MovieLikeDislike = require("../models/MovieLikeDislike");
const verify = require("../verifyToken");
//CREATE
router.post("/", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = yield newMovie.save();
            res.status(201).json(savedMovie);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
}));
//UPDATE
router.put("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = yield Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedMovie);
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
            yield Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted...");
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
router.get("/find/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    //router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = yield Movie.findById(req.params.id);
        res.status(200).json(movie);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET RANDOM
router.get("/random", (req, res) => __awaiter(this, void 0, void 0, function* () {
    //router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = yield Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        }
        else if (type === "movies") {
            movie = yield Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        else {
            movie = yield Movie.aggregate([{ $sample: { size: 1 } }]);
        }
        res.status(200).json(movie);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET SINGLE
router.get("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    //router.get("/find/:id", verify, async (req, res) => {
    try {
        const movieLikeDislike = yield MovieLikeDislike.findOne({
            user: req.user.id,
            movie: req.params.id,
        });
        const movie = yield Movie.findById(req.params.id);
        const m = movie === null || movie === void 0 ? void 0 : movie.toObject();
        m.like = movieLikeDislike === null || movieLikeDislike === void 0 ? void 0 : movieLikeDislike.isLike;
        res.status(200).json(m);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}));
//GET ALL
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const movies = yield Movie.find();
        res.status(200).json(movies.reverse());
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//Like movie
router.post("/:id/like", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.user.id);
        const movie = yield Movie.findById(req.params.id);
        const movieLikeDislike = yield MovieLikeDislike.findOne({
            user: user._id,
            movie: movie._id,
        });
        if (movieLikeDislike == null) {
            const like = new MovieLikeDislike({
                user: user._id,
                movie: movie._id,
                isLike: true,
            });
            yield like.save();
        }
        else {
            if (movieLikeDislike.isLike) {
                yield MovieLikeDislike.findByIdAndDelete(movieLikeDislike.id);
            }
            else {
                yield MovieLikeDislike.findOneAndUpdate(movieLikeDislike.id, {
                    $set: {
                        isLike: true,
                    },
                });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}));
//Dislike movie
router.post("/:id/dislike", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.user.id);
        const movie = yield Movie.findById(req.params.id);
        const movieLikeDislike = yield MovieLikeDislike.findOne({
            user: user._id,
            movie: movie._id,
        });
        if (movieLikeDislike == null) {
            const dislike = new MovieLikeDislike({
                user: user._id,
                movie: movie._id,
                isLike: false,
            });
            yield dislike.save();
        }
        else {
            if (!movieLikeDislike.isLike) {
                yield MovieLikeDislike.findByIdAndDelete(movieLikeDislike.id);
            }
            else {
                yield MovieLikeDislike.findOneAndUpdate(movieLikeDislike.id, {
                    $set: {
                        isLike: false,
                    },
                });
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}));
module.exports = router;

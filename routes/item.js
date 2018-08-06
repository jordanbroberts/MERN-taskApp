var express = require("express");
var itemRouter = express.Router();

var passport = require("passport");
require("../config/passport")(passport);

var Item = require("../models/Item.js");
var User = require("../models/User.js");

itemRouter.get(
    "/username",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            User.findById(req.user._id, function(err, user) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while retrieving ."
                    });
                } else {
                    res.send(user);
                }
            }).lean();
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.post(
    "/add/post",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            var item = new Item({
                name: req.body.name,
                task: req.body.task,
                duedate: req.body.duedate,
                complete: req.body.complete || "",
                author: req.user._id
            });

            item.save(function(err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while creating."
                    });
                } else {
                    res.send(data);
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.get("/", passport.authenticate("jwt", { session: false }), function(
    req,
    res,
    next
) {
    var token = getToken(req.headers);
    if (token) {
        Item.find({ author: req.user._id }, function(err, item) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving ."
                });
            } else {
                res.send(item);
            }
        }).lean();
    } else {
        return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
});

itemRouter.get(
    "/deadline/",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.find({ author: req.user._id })
                .sort({ duedate: 1 })
                .exec(function(err, item) {
                    if (err) {
                        res.status(500).send({
                            message: "Some error occurred while retrieving ."
                        });
                    } else {
                        res.send(item);
                    }
                });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.get(
    "/overdue/",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.find({ author: req.user._id, duedate: { $lt: new Date() } })
                .sort({ duedate: 1 })
                .exec(function(err, item) {
                    if (err) {
                        res.status(500).send({
                            message: "Some error occurred while retrieving ."
                        });
                    } else {
                        res.send(item);
                    }
                });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.get(
    "/incomplete/",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.find({ author: req.user._id, complete: "" }, function(
                err,
                item
            ) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while retrieving ."
                    });
                } else {
                    res.send(item);
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.get(
    "/complete/",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.find({ author: req.user._id, complete: "COMPLETED" }, function(
                err,
                item
            ) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while retrieving ."
                    });
                } else {
                    res.send(item);
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.put(
    "/iscomplete/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.findByIdAndUpdate(req.params.id, {
                complete: "COMPLETED"
            }).then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: "not found with id " + req.params.id
                    });
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.get(
    "/find/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.findById(req.params.id).then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: "not found with id " + req.params.id
                    });
                }
                res.send(item);
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.put(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    task: req.body.task,
                    duedate: req.body.duedate,
                    complete: req.body.complete || ""
                },
                { new: true }
            ).then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: "not found with id " + req.params.id
                    });
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

itemRouter.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
        var token = getToken(req.headers);
        if (token) {
            Item.findByIdAndRemove(req.params.id).then(item => {
                if (!item) {
                    return res.status(404).send({
                        message: "not found with id " + req.params.id
                    });
                }
            });
        } else {
            return res
                .status(403)
                .send({ success: false, msg: "Unauthorized." });
        }
    }
);

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = itemRouter;

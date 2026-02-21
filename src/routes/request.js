const express = require("express");
const routerRequest = express.Router();
const { userAuth } = require("../middleware/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

routerRequest.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found with this id",
        });
      }

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status type");
      }

      //if there is existing connection request from the same user

      const existingRequestcconnection = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequestcconnection) {
        throw new Error(
          "Connection request already exists between these users",
        );
      }

      const connectionrequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const result = await connectionrequest.save();
      res.json({
        message: "connection request is sent successfully",
        result,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  },
);

routerRequest.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const { status, requestId } = req.params;

      const allowedstatus = ["Accepted", "Rejected"];
      if (!allowedstatus.includes(status)) {
        throw new Error("Invalid status type");
      }

      const connectionrequest = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionrequest) {
        throw new Error("Connection request not found");
      }
      connectionrequest.status = status;
      const data = await connectionrequest.save();
      res.json({
        message: "connection request is" + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  },
);

module.exports = { routerRequest };

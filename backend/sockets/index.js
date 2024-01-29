const ContinueWatchingList = require("../models/ContinueWatchingList");

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("userLoggedIn", (userId, clientSocketId) => {
      console.log("user logged in ", userId, clientSocketId);

      //  console.log("io.sockets ", io.sockets.sockets);

      // 1. Retrieve currently connected sockets for this user
      const userSockets = Object.values(io.sockets.sockets).filter(
        (_socket) => {
          // Access your user authentication mechanism to check for the user
          return _socket.userId === userId; // Replace with your authentication logic
        }
      );

      const otherSockets = userSockets.filter(
        (userSocket) => userSocket.id !== clientSocketId
      );

      console.log("user sockets count ", userSockets.length);

      // 2. Disconnect other sockets for this user
      otherSockets.forEach((otherSocket) => {
        // Optionally, emit a "forceLogout" event before disconnecting
        otherSocket.emit("forceLogout", "Logged in from another location");

        // Disconnect the socket
        otherSocket.disconnect(true);
        console.log("force logout emit ");
      });
    });

    socket.on("updateMovieProgress", async (data) => {
      const { movieId, watchedPercentage, userId } = data;

      try {
        // Find or create the user's ContinueWatchingList document
        const continueWatchingList =
          await ContinueWatchingList.findOneAndUpdate(
            { user: userId },
            {
              $addToSet: { content: movieId },
              $set: { watchedPercentage, timestamp: Date.now() },
            },
            { upsert: true, new: true }
          );

        console.log("Movie progress updated:", continueWatchingList);
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    });
  });
};

module.exports = setupSocket;

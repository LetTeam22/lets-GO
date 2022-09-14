const { Server } = require("socket.io");
const httpServer = require("./app");
const { User } = require('./db');
const { createNotification } = require('./controllers/notificationsControllers');
const { FRONT_URL } = process.env; 

const io = new Server(httpServer, {
    cors: {
        origin: FRONT_URL
    }
});

let onlineUsers = [];

const getOnlineUsers = async () => {
    const allUsersOnline = await User.findAll({
        where: {
            isOnline: true,
        }
    });

    allUsersOnline.map(user => {
        !onlineUsers.some(u => u.email === user.email) &&  onlineUsers.push({
            username: user.name,
            email: user.email,
            socketId: user.socketId
        });
    });

    console.log(onlineUsers);
    return onlineUsers;
}

const addNewUserOnline = async (user, socketId) => {
    try {
        const onlineUser = await User.findOne({
            where: {
                email: user.email
            }
        })
        onlineUser.isOnline = true;
        onlineUser.socketId = socketId;
        await onlineUser.save();
    } catch(err) {
        console.log(err);
    }
};

const removeUser = async (socketId) => {
    try {
        const user = onlineUsers.find(user => user.socketId === socketId)
        const removeUser = await User.findOne({
            where: {
                email: user?.email
            }
        })
        removeUser.isOnline = false;
        removeUser.socketId = null;
        await removeUser.save();

        onlineUsers = onlineUsers.filter(user => user.email !== removeUser.email);

        console.log(onlineUsers);
    } catch (err) {
        console.log(err)
    }
};

const getUser = async (email) => {
    const user = onlineUsers.find(u => u.email === email);
    return user;
};


io.on("connection", (socket) => {

    socket.on("likeExperience",  async ({
        senderName,
        receiverName
    }) => {
        const receiver = await getUser(receiverName);
        await createNotification('like', senderName, receiver);
        io.to(receiver?.socketId).emit("getLike", {
            senderName
        });
    });

    socket.on("newUserOnline", async (user) => {
        await addNewUserOnline(user, socket.id);
        await getOnlineUsers();
        io.to(socket.id).emit('login');
    });

    socket.on("disconnect", async () => {
        await removeUser(socket.id);
    });

});

module.exports = httpServer;
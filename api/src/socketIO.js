const { Server } = require("socket.io");
const httpServer = require("./app");
const { User } = require('./db');
const { createNotification } = require('./controllers/notificationsControllers');
const { postBooking } = require("./controllers/bookingsControllers");
const { FRONT_URL } = process.env; 

const io = new Server(httpServer, {
    cors: {
        origin: FRONT_URL
    }
});

let onlineUsers = [];

const getOnlineUsers = async () => {

    try {

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

        return onlineUsers;
    } catch(err) {
        console.log(err);
    }
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

    } catch (err) {
        console.log(err)
    }
};

const getUser = async (email) => {
    const user = onlineUsers.find(u => u.email === email);
    return user;
};


io.on("connection", (socket) => {

    socket.on('shoppingCart', () => {
        io.to(socket.id).emit('shoppingCartNot');
    })

    socket.on("likeExperience",  async ({
        senderName,
        receiverName,
        senderEmail
    }) => {
        try {
            const receiver = await getUser(receiverName);
            await createNotification('like', senderName, receiver, senderEmail);
            io.to(receiver?.socketId).emit("getLike", {
                senderName
            });
            
        } catch(err) {
            console.log(err);
        }
    });

    socket.on("newUserOnline", async (user) => {
        try {
            await addNewUserOnline(user, socket.id);
            await getOnlineUsers();
            io.to(socket.id).emit('login');
        } catch(err) {
            console.log(err);
        }
    });

    socket.on("disconnect", async () => {
        await removeUser(socket.id);
    });

});

module.exports = httpServer;
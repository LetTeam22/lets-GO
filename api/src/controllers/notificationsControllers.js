const { User, Notifications } = require('../db');

const createNotification = async (type, username, receiverName) => {

    if(type === 'like') {
        const user = await User.findOne({
            where: {
                email: receiverName.email
            }
        })

        const newNotification = await Notifications.create({
            type,
            content: `A ${username} le ha gustado tu publicacion`
        })

        await user.addNotifications(newNotification);
        await user.save();
    };
};

const getUserNotifications = async (req, res) => {

    const { email } = req.query;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
    
        const allNotifications = await Notifications.findAll({
            where: {
                userIdUser: user.idUser
            }
        })
    
        return res.send(allNotifications);
    } catch(err) {
        console.log(err);
    }
    
}

module.exports = {
    createNotification,
    getUserNotifications
}
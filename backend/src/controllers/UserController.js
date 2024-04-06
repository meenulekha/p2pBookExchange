// UserController.js

const User = require('../models/User');
const Community = require('../models/Community');

async function groupUsersByCommunity() {
    try {
        // Retrieve all users
        const users = await User.find().populate('communities');

        // Group users by community
        const groupedUsers = {};
        users.forEach(user => {
            user.communities.forEach(community => {
                if (!groupedUsers[community.name]) {
                    groupedUsers[community.name] = [];
                }
                groupedUsers[community.name].push(user);
            });
        });

        return groupedUsers;
    } catch (error) {
        console.error('Error grouping users by community:', error);
        throw error; 
    }
}

module.exports = {
    groupUsersByCommunity
};

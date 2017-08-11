import bcrypt from 'bcrypt';

module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert('users', [
            {

                username: 'admin',
                email: 'admin@gmail.com',
                password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
                role: 'admin',
                membership: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {

                username: 'doe',
                email: 'john@gmail.com',
                password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
                role: 'user',
                membership: 'Pro',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'ted',
                email: 'jane@mail.com',
                password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
                role: 'user',
                membership: 'Free',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {individualHooks: true});
    },

    down (queryInterface) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
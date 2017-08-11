module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert('books', [
            {
                isbn: '#7764',
                title: 'Half of a yellow sun',
                author: 'CHimamanda',
                year: 2017,
                description: 'lorem ipsum',
                quantity: 6,
                category: 'life',
                image: 'images/halfsun.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                isbn: '#7765',
                title: 'Things fall apart',
                author: 'Chinua Achebe',
                year: 2010,
                description: 'lorem ipsum',
                quantity: 3,
                category: 'africa',
                image: 'images/africa.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                isbn: '#7766',
                title: 'Die Hard',
                author: 'Craige spilberg',
                year: 2016,
                description: 'Lorem Ipsum',
                quantity: 32,
                category: 'Action',
                image: 'images/stuff.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                isbn: '#7768',
                title: 'Health and Wealth',
                author: 'Dele Giwa',
                year: 2017,
                description: 'Lorem Ipsum',
                quantity: 5,
                category: 'politics',
                image: 'images/politics.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {individualHooks: true});
    },

    down(queryInterface) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
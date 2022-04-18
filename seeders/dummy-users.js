"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // added one user for testing
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Snow",
          phone: "123133",
          email: "snow@test.com",
          username: "snow",
          password: "snow",
          status: "active",
          createdAt: "2022-04-01T10:00",
          updatedAt: "2022-04-01T10:00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};

import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const usersModel = sequelize.define('users', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Bronze'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate() {
        // Associations
      }
    },
    hooks: {
      beforeCreate: (users) => {
        const hashP = bcrypt.hashSync(users.password, 10);
        users.password = hashP;
        return users;
      },
    }
  });
  return usersModel;
};

export default user;
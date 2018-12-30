module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Staff', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    middleName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'initial'
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
    },
    branchId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Branch',
        key: 'id',
        as: 'branch'
      }
    },
    supervisorId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Supervisor',
        key: 'id',
        as: 'supervisor'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('Staff')
};

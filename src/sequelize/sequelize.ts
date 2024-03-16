import { Sequelize, DataTypes, UUID, UUIDV4 } from 'sequelize'
require('dotenv').config();

// variaveis de ambiente
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = process.env;
//*em tsconfig, mudar strict para 'false' pois o ts pode identificar as variaveis de ambiente como undefined
//e assim se corrige esse erro

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

// Definição do modelo User
const User = sequelize.define('User', {
  idUser: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  tableName: 'user',
  timestamps: true,
});

// Definição do modelo Restaurant
const Restaurant = sequelize.define('Restaurant', {
  idRestaurant: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: 'Indefinido'
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Indefinido'
  },
  contactNumber: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: 'Indefinido'
  },
  instagramProfileName: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: 'Indefinido'
  },
  doDelivery: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  profileURL: {
    type: DataTypes.TEXT,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/768px-Circle-icons-image.svg.png'
  }
}, {
  tableName: 'restaurant',
  timestamps: true
});

// Definição do modelo Menu
const Menu = sequelize.define('Menu', {
  idMenu: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'menu',
  timestamps: true
});

// Definição do modelo Category
const Category = sequelize.define('Category', {
  idCategory: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'category',
  timestamps: true
});

// Definição do modelo Item
const Item = sequelize.define('Item', {
  idItem: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  price: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  imageURL: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avaliable: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  vegan: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  }
}, {
  tableName: 'item',
  timestamps: true
});

// Definição do modelo Schedule
const Schedule = sequelize.define('Schedule', {
  idSchedule: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  monIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  tueIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  wedIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  thuIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  friIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  satIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  sunIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  monDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  tueDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  wedDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  thuDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  friDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  satDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  sunDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Sem descrição'
  },
  display: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  }
}, {
  tableName: 'schedule',
  timestamps: true
});

// Definição das associações entre os modelos
Restaurant.hasOne(Menu, { foreignKey: 'restaurant_idRestaurant' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_idRestaurant' });

Menu.hasMany(Category, { foreignKey: 'menu_idMenu' });
Category.belongsTo(Menu, { foreignKey: 'menu_idMenu' });

Category.hasMany(Item, { foreignKey: 'category_idCategory' });
Item.belongsTo(Category, { foreignKey: 'category_idCategory' });

Restaurant.hasOne(Schedule, { foreignKey: 'restaurant_idRestaurant' });
Schedule.belongsTo(Restaurant, { foreignKey: 'restaurant_idRestaurant' });

User.hasOne(Restaurant, { foreignKey: 'user_idUser' });
Restaurant.belongsTo(User, { foreignKey: 'user_idUser' });

export { User, Restaurant, Menu, Category, Item, Schedule, sequelize };

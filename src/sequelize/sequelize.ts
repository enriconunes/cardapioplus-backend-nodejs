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
    defaultValue: 'Nome indefinido'
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Endereço indefinido'
  },
  contactNumber: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: '(00)00000-0000'
  },
  instagramProfileName: {
    type: DataTypes.STRING(45),
    allowNull: true,
    defaultValue: 'Instragram indefinido'
  },
  doDelivery: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  deliveryFee: {
    type: DataTypes.STRING(10),
    defaultValue: '0.00'
  },
  deliveryTime: {
    type: DataTypes.STRING(5),
    defaultValue: '30'
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
  timestamps: false
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
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  imageURL: {
    type: DataTypes.TEXT,
    allowNull: false
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
    defaultValue: 1
  },
  tueIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  },
  wedIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  },
  thuIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  },
  friIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  },
  satIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  },
  sunIsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  monDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  tueDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  wedDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  thuDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  friDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  satDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Aberto das 08h00 às 22h00'
  },
  sunDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Fechado aos domingos'
  },
  display: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
  }
}, {
  tableName: 'schedule',
  timestamps: false
});

// Definição do modelo Pedido
const Order = sequelize.define('Order', {
  idOrder: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  typeOrder: {
    type: DataTypes.ENUM('store', 'delivery'),
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  statusOrder: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  table: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  clientContact: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  clientAddress: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'order',
  timestamps: true
});

// Definição do modelo ItemPedido
const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'order_item',
  timestamps: false
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

// Definir relacionamento entre Order e OrderItem (1:N)
Order.hasMany(OrderItem, { foreignKey: 'idOrder' });
OrderItem.belongsTo(Order, { foreignKey: 'idOrder' });

// Definir relacionamento entre Item e OrderItem (1:N)
Item.hasMany(OrderItem, { foreignKey: 'idItem' });
OrderItem.belongsTo(Item, { foreignKey: 'idItem' });

// Definir relacionamento entre Order e Restaurant (N:1)
Order.belongsTo(Restaurant, { foreignKey: 'idRestaurant' });

export { User, Restaurant, Menu, Category, Item, Schedule, Order, OrderItem, sequelize };

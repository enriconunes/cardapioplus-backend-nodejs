import { Router } from "express";

// Middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";

// User Controllers
import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { UserDetailsController } from "./controllers/User/UserDetailsController";

// Restaurant Controllers
import { RestaurantDetailsController } from "./controllers/Restaurant/RestaurantDetailsController";
import { UpdateRestaurantController } from "./controllers/Restaurant/UpdateRestaurantController";
import { UpdateScheduleController } from "./controllers/Restaurant/UpdateScheduleController";
import { UploadProfileAvatarController } from "./controllers/Restaurant/UploadProfileAvatarController";

// Menu controllers
import { ListMenuController } from "./controllers/Menu/ListMenuController";
import { ShowMenuClientController } from "./controllers/Menu/ShowMenuClientController";

// Category Controllers
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { UpdateCategoryController } from "./controllers/Category/UpdateCategoryController";
import { DeleteCategoryController } from "./controllers/Category/DeleteCategoryController";

// Item Controllers
import { CreateItemController } from "./controllers/Item/CreateItemController";
import { UpdateItemController } from "./controllers/Item/UpdateItemController";
import { ItemDetailsController } from "./controllers/Item/ItemDetailsController";
import { DeleteItemController } from "./controllers/Item/DeleteItemController";

// Configuração do multer
import multer from "multer";
import multerConfig from "./config/multer"

const router = Router();
const upload = multer(multerConfig)

// User routes
router.post('/user', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/user', isAuthenticated, new UserDetailsController().handle)

// Restaurant routes
router.get('/restaurant', isAuthenticated, new RestaurantDetailsController().handle)
router.put('/restaurant', isAuthenticated, new UpdateRestaurantController().handle)
router.put('/schedule', isAuthenticated, new UpdateScheduleController().handle)
router.put('/avatarProfile', isAuthenticated, upload.single('image'), new UploadProfileAvatarController().handle)

// Menu routes
router.get('/menu', isAuthenticated, new ListMenuController().handle)
router.get('/cardapio', new ShowMenuClientController().handle)

// Category routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.put('/category', isAuthenticated, new UpdateCategoryController().handle)
router.put('/category/delete', isAuthenticated, new DeleteCategoryController().handle)

// Item routes
router.post('/item', upload.single('image'), isAuthenticated, new CreateItemController().handle)
router.put('/item', upload.single('image'), isAuthenticated, new UpdateItemController().handle)
router.get('/item', isAuthenticated, new ItemDetailsController().handle)
router.delete('/item', isAuthenticated, new DeleteItemController().handle)

export { router }
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import getProductsReducer from "./reducers/productReducer";
import ScreenReducer from "./reducers/globalReducer";
import getBannersReducer, {
  getBannerMobilesReducer,
} from "./reducers/bannerReducer";
import getAdsReducer from "./reducers/adsReducer";
import getGalleryReducer from "./reducers/galleryReducer";
import CardItemsReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  getProducts: getProductsReducer,
  screen: ScreenReducer,
  getBanners: getBannersReducer,
  getBannerMobiles: getBannerMobilesReducer,
  getAds: getAdsReducer,
  getGallery: getGalleryReducer,
  cardItems: CardItemsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

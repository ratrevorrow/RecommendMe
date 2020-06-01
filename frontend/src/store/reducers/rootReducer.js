import { combineReducers } from "redux";
import { authentication } from "./login";
import { registration } from "./registration";
import { beerlist } from "./beerlist";
import { getTastedBeers } from "./tasted";

const rootReducer = combineReducers({ authentication, registration, beerlist, getTastedBeers });

export default rootReducer;

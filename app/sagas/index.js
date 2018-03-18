import {fork} from "redux-saga/effects";
import * as watchers from "./watchers";

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForeman() {
    // When the application starts, it only waits for the FETCH_AND_DECRYPT_WALLET_FROM_SERVER aciton
    // PRODUCT
}

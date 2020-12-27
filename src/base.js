import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAIhgdnjniSDfF2QC_8A20tUIEXa19xyDI",
    authDomain: "catch-of-the-day-275b2.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-275b2-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export {firebaseApp};
export default base;
import { combineReducers } from "redux";
import funcReducer from "./funcReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
    funcRed: funcReducer
})

export const store = configureStore({reducer: rootReducers})
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/auth/authSlice";

const isProduction = process.env.NODE_ENV === "production";

// Create a persist configuration object
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  devTools: !isProduction, // Disable dev tools in production
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

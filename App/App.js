import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/project.slice";

export default configureStore({
  reducer: {
    getStore: usersReducer,
  },  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

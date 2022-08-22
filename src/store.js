import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./modules/Home/slices/bannerSlice";

const store = configureStore({
  reducer: {
    banner: bannerSlice,
  },
});

export default store;

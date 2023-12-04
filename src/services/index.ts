import { createAsyncThunk } from "@reduxjs/toolkit";
import stackline_data from "../assets/stackline_data.json";

export const fetchContent = createAsyncThunk("app/fetchContent", async () => {
  //Fake Fetch Call
  const data = await stackline_data[0];
  return data;
});

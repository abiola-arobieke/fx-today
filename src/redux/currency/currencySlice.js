import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  currencyList: null,
  singleCurrency: null,
};

// Fetch currency exchange API
const fetchCurrencyList = (url) => createAsyncThunk(url, async (apiUrls, thunkAPI) => {
  try {
    const response = await axios
      .all(apiUrls.map((apiUrl) => axios.get(apiUrl)))
      .then(
        axios.spread(({ data: allCurrency }, { data: rate }) => {
          const dataKeys = Object.keys(rate);
          const locals = Object.entries(rate[dataKeys[1]]).map(
            ([type, todayRate]) => ({
              type,
              todayRate,
            }),
          );
          const res = Object.entries(allCurrency).map(
            ([code, name]) => ({
              code,
              name,
            }),
          );
          const newArr = res.map((res) => {
            const localCurrency = locals.filter(
              (local) => res.code === local.type,
            );
            return {
              ...res,
              rateNow: localCurrency[0].todayRate.toFixed(4),
              flag: `https://currencyfreaks.com/photos/flags/${localCurrency[0].type}.png`,
            };
          });
          return newArr;
        }),
      );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unable to get data');
  }
});

// Store API function in a variable
export const getCurrencyList = fetchCurrencyList('currency/AllCurrencies');
export const getSingleCurrency = fetchCurrencyList('currency/SingleCurrency');

// Create slice
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: {
    [getCurrencyList.fulfilled]: (state, action) => {
      state.currencyList = action.payload;
    },
    [getSingleCurrency.fulfilled]: (state, action) => {
      state.singleCurrency = action.payload;
    },
  },
});

export default currencySlice.reducer;

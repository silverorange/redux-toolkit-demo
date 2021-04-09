import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Person {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  created: string;
  edited: string;
  url: string;
}

interface State {
  [id: number]: {
    loading: boolean;
    error?: string;
    data?: Person;
  };
}

const initialState: State = {};
const API_BASE = 'https://swapi.dev/api/people';

export const fetchPersonById = createAsyncThunk<
  Person,
  number,
  { rejectValue: Error }
>('people/fetchPersonById', async (id, thunkAPI) => {
  const url = `${API_BASE}/${id}`;

  return await new Promise<Person>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        resolve({
          name: data.name,
          height: Number(data.height),
          mass: Number(data.mass),
          hairColor: data.hair_color,
          skinColor: data.skin_color,
          eyeColor: data.eye_color,
          birthYear: data.birth_year,
          gender: data.gender,
          created: data.created,
          edited: data.edited,
          url: data.url,
        });
      } catch (e) {
        reject(e);
      }
    }, 2000);
  });
});

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonById.pending, (state, action) => {
      if (!action.meta.arg) {
        console.log(action);
      }
      if (state[action.meta.arg] === undefined) {
        state[action.meta.arg] = {
          error: undefined,
          loading: true,
          data: undefined,
        };
      } else {
        state[action.meta.arg].error = undefined;
        state[action.meta.arg].loading = true;
        state[action.meta.arg].data = undefined;
      }
    });
    builder.addCase(fetchPersonById.rejected, (state, action) => {
      if (state[action.meta.arg] === undefined) {
        state[action.meta.arg] = {
          error: action.payload?.message,
          loading: false,
          data: undefined,
        };
      } else {
        state[action.meta.arg].error = action.payload?.message;
        state[action.meta.arg].loading = false;
      }
    });
    builder.addCase(fetchPersonById.fulfilled, (state, action) => {
      if (state[action.meta.arg] === undefined) {
        state[action.meta.arg] = {
          error: undefined,
          loading: false,
          data: action.payload,
        };
      } else {
        state[action.meta.arg].error = undefined;
        state[action.meta.arg].loading = false;
        state[action.meta.arg].data = action.payload;
      }
    });
  },
});

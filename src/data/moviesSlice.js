import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, page = 1 }) => {
    const urlWithPage = apiUrl.includes('page=') ? apiUrl : `${apiUrl}&page=${page}`;
    const response = await fetch(urlWithPage);
    return response.json();
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        page: 1,
        total_pages: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            const { results, page, total_pages } = action.payload;
            if (page === 1) {
                state.movies = results;
            } else {
                state.movies = [...state.movies, ...results];
            }
            state.page = page;
            state.total_pages = total_pages;
            state.fetchStatus = 'success';
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice

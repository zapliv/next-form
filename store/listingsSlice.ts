import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Listing {
    id: number;
    title: string;
    sku: string;
    condition: string;
    manufacturer: string;
    scale: string;
    material: string;
    description: string;
    category: string;
    subcategory?: string;
    type: string;
    createdAt: string;
}

interface ListingsState {
    listings: Listing[];
}

const initialState: ListingsState = {
    listings: [],
};

const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        addListing(state, action: PayloadAction<Listing>) {
            state.listings.push(action.payload);
        },
        deleteListing(state, action: PayloadAction<number>) {
            state.listings = state.listings.filter(listing => listing.id !== action.payload);
        },
    },
});

export const { addListing, deleteListing } = listingsSlice.actions;
export default listingsSlice.reducer;
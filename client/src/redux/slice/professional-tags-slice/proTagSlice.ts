
import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import { Tag } from 'lucide-react';



interface Tag{
    id:string;
    label : string;
}

interface TagsState {
    [containerId : string] : Tag[];
}

const initialState : TagsState ={};
export const proTagsSlice = createSlice({
    name : "proTags",
    initialState,
    reducers : {
        addProTag : (
            state,
            action : PayloadAction<{containerId :string , proTag : Tag}>
        ) => {
            const { containerId, proTag } = action.payload;
            if (!state[containerId]) {
              state[containerId] = [];
            }
            if (!state[containerId].some((t) => t.id === proTag.id)) {
              state[containerId].push(proTag);
            }
        },
        removeProTag: (
            state,
            action: PayloadAction<{ containerId: string; proTag: string }>
          ) => {
            const { containerId, proTag } = action.payload;
            if (state[containerId]) {
              state[containerId] = state[containerId].filter(
                (tag) => tag.id !== proTag
              );
            }
          },
          clearProTags: (state, action: PayloadAction<{ containerId: string }>) => {
            const { containerId } = action.payload;
            state[containerId] = [];
          },
    }
})


export const { addProTag, removeProTag, clearProTags } = proTagsSlice.actions;
export default proTagsSlice.reducer;
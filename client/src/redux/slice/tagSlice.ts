// tagsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface TagsState {
  [containerId: string]: Tag[];
}

const initialState: TagsState = {};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (
      state,
      action: PayloadAction<{ containerId: string; tag: Tag }>
    ) => {
      const { containerId, tag } = action.payload;
      if (!state[containerId]) {
        state[containerId] = [];
      }
      if (!state[containerId].some((t) => t.id === tag.id)) {
        state[containerId].push(tag);
      }
    },
    removeTag: (
      state,
      action: PayloadAction<{ containerId: string; tagId: string }>
    ) => {
      const { containerId, tagId } = action.payload;
      if (state[containerId]) {
        state[containerId] = state[containerId].filter(
          (tag) => tag.id !== tagId
        );
      }
    },
    clearTags: (state, action: PayloadAction<{ containerId: string }>) => {
      const { containerId } = action.payload;
      state[containerId] = [];
    },
  },
});

export const { addTag, removeTag, clearTags } = tagsSlice.actions;
export default tagsSlice.reducer;

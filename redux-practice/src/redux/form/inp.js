import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const inp = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setInp: (state, action) => {
    
      state.value = action.payload
    },
},
})

export const { setInp } = inp.actions

export default inp.reducer
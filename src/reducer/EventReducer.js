export const initialState = {
   reload: false,
}

export const EventReducer = (state, action) => {
   switch (action.type) {
      case 'reloadPage':
         console.log('ACTION')
         return {
            ...state,
            reload: action.payload.reload,
         }
      default:
         return state;
   }
}
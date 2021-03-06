export const initialState = {
   reload: false,
}

export const EventReducer = (state, action) => {
   switch (action.type) {
      case 'reloadPage':
         return {
            ...state,
            reload: action.payload.reload,
         }
         break;
      default:
         return state;
   }
}
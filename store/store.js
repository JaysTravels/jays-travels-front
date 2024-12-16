
 

const {configureStore} = require("@reduxjs/toolkit");
import flightsReducer  from '../store/AvailabilitySlice';
import airSellReducer from '../store/AirSellSlice';
import createPnrSliceReducer from '../store/CreatePnrSlice';
import getPaymentPagReduer  from '../store/PaymentSlice';
export const store = configureStore({
    reducer: {
        flights: flightsReducer,
        airsell: airSellReducer,
        generatePnr : createPnrSliceReducer,
        payments : getPaymentPagReduer,
      },
})
export default store;
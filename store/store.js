
 

const {configureStore} = require("@reduxjs/toolkit");
import flightsReducer  from '../store/AvailabilitySlice';
import airSellReducer from '../store/AirSellSlice';
import createPnrSliceReducer from '../store/CreatePnrSlice';
import getPaymentPagReduer  from '../store/PaymentSlice';
import securityToken from '../store/authentication';
import enquiryReducer from '../store/enquirySlice';
import getManualPaymentPageReducer from '../store/ManualPayment'
export const store = configureStore({
    reducer: {
        flights: flightsReducer,
        airsell: airSellReducer,
        generatePnr : createPnrSliceReducer,
        payments : getPaymentPagReduer,
        token : securityToken,
        enquiry : enquiryReducer,
        manualpayment : getManualPaymentPageReducer
      },
})
export default store;
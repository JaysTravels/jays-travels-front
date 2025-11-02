const {configureStore} = require("@reduxjs/toolkit");
import flightsReducer  from '../store/AvailabilitySlice';
import hotelReducer  from '../store/hotels/HotelAvailabilitySlice';
import airSellReducer from '../store/AirSellSlice';
import createPnrSliceReducer from '../store/CreatePnrSlice';
import getPaymentPagReduer  from '../store/PaymentSlice';
import securityToken from '../store/authentication';
import enquiryReducer from '../store/enquirySlice';
import insuranceReducer from '../store/InsuranceSlice';
import getManualPaymentPageReducer from '../store/ManualPayment';
import getDeeplink from '../store/deeplinkSlice';
import getGoogleDeeplink from '../store/GoogleApiSlice';
import ActiveUsers from '../store/ActiveUsersSlice';
import getLoginReducer from '../store/loginSlice';
export const store = configureStore({
    reducer: {
        flights: flightsReducer,
        hotels: hotelReducer,
        airsell: airSellReducer,
        generatePnr : createPnrSliceReducer,
        payments : getPaymentPagReduer,
        token : securityToken,
        enquiry : enquiryReducer,
        manualpayment : getManualPaymentPageReducer,
        insurance : insuranceReducer,
        deeplink : getDeeplink,
        googledeeplink : getGoogleDeeplink,
        activeusers: ActiveUsers,
        logindetails: getLoginReducer,
      },
})
export default store;
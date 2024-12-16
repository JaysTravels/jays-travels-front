const {createSlice,nanoid} = require("@reduxjs/toolkit");


const initialState = {
    employees :[],
    flights:[],
    origin : '',
    destination : '',
    fromDate : '',
    toDate:'',
    adults:0,
    childs:0,
    infants: 0,
    cabinClass : ''
}

const Slice = createSlice({
    name : 'addEmployeeSlice',
    initialState,
    reducers : {
        addEmployee:(state,action)=> {
            const data= {
                id : nanoid(),
                name : action.payload
            }
            state.employees.push(data)
        }
    },
    name : 'searchFlight',
    initialState,
    reducers : {
        searchFlight:(state,action)=> {
            const { origin, destination,fromdate,todate,adults,childs,infants,cabin } = action.payload;
            state.destination = destination;
            state.origin = origin;
            state.fromDate = fromdate;
            state.toDate = todate;
            state.adults = adults;
            state.childs = childs;
            state.infants = infants;
            state.cabinClass = cabin;
          
        }
    }
});
 export const {addEmployee,searchFlight} = Slice.actions;
 export default Slice.reducer;
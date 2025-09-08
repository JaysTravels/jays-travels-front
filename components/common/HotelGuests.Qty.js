import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const HotelGuestsQty = ({
  adultsValue,
  childsValue,
  infantsValue,
  selectedClassValue,
  onFocus,
  onGuestsChange,
  updateshow,
  parentcabin,
}) => {
  const [valueAdult, setValueAdult] = useState(adultsValue);
  const [valueChildren, setValueChildren] = useState(childsValue);
  const [valueInfants, setValueInfants] = useState(infantsValue);
  const [cabin, setCabin] = useState(selectedClassValue);
  const updateParent = () => {
    onGuestsChange({ valueAdult, valueChildren, valueInfants });
  };

  const handleshowparent = () => {
    if (updateshow) {
      updateshow(false);
    }
  };
  const handleChangeAdult = (e) => {
    setValueAdult(parseInt(e.target.value));
  };

  
  const handleChangeChildren = (e) => {
    setValueChildren(parseInt(e.target.value));
  };

   const handleChangeInfants = (e) => {
    setValueInfants(parseInt(e.target.value));
  };

  React.useEffect(() => {
    updateParent();
  }, [valueAdult, valueChildren, valueInfants]);

  return (
    <>
      <div className="showPassengers" onFocus={onFocus} onClick={(event) => event.stopPropagation()}> 
        {" "}
        {/*onBlur={() => handleshowparent()} */}
        <div className="rowSt">
      <label>Adult</label>
      <div className="inputGp">
        <select
          value={valueAdult}
          onChange={handleChangeAdult}
          className="w-20 p-1 border rounded text-center">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
           </div>
         </div>

         <div className="rowSt mt10">
      <label>Children</label>
      <div className="inputGp">
        <select
          value={valueChildren}
          onChange={handleChangeChildren}
          className="w-20 p-1 border rounded text-center"
        >
          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
           <div className="rowSt mt10">
      <label>Infants</label>
      <div className="inputGp">
        <select
          value={valueInfants}
          onChange={handleChangeInfants}
          className="w-20 p-1 border rounded text-center"
        >
          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>    
      </div>
    </>
  );
};

export default HotelGuestsQty;

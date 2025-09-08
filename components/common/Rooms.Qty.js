import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const RoomsQty = ({
    roomsValue,
    onFocusRooms,
    onGuestsChangeRoom,
    updateshowRoom  
}) => {
  const [valueRooms, setvalueRooms] = useState(roomsValue);
  
  const updateParent = () => {
    onGuestsChangeRoom({ valueRooms });
  };

  const handleshowparentRoom = () => {
    debugger;
    if (updateshowRoom) {
      updateshowRoom(false);
    }
  };
  const handleIncrementRoom = () => {
    setvalueRooms(valueRooms + 1);
  };
   const handleDecrementRooms = () => {
    setvalueRooms((valueRooms) => (valueRooms > 1 ? valueRooms - 1 : 1));
  };

  const handleChangeRooms = (e) => {
    debugger;
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setvalueRooms(newValue);
    }
  };


  React.useEffect(() => {
    updateParent();
  }, [valueRooms]);

  return (
    <>
<div className="showRooms">
  <label htmlFor="roomQuantity">Room</label>
  <select
    id="roomQuantity"
    value={valueRooms}
    onChange={(e) => handleChangeRooms(e)}
    className="p-0 text-center border-0 rounded-0"
  >
    <option value={1}>01</option>
    <option value={2}>02</option>
    <option value={3}>03</option>  
  </select>
</div>
    </>
  );
};

export default RoomsQty;

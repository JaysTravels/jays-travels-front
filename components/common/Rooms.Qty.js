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
      <div className="showRooms" onFocus={onFocusRooms} onClick={(event) => event.stopPropagation()}> 
        {" "}
       <div className="rowSt">
          <Label>Room</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleDecrementRooms()}
            >
              -
            </Button>

            <Input
              type="text"
              value={valueRooms}
              onChange={(e) => handleChangeRooms(e)}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleIncrementRoom()}
            >
              +
            </Button>
          </div>
        </div>       
        <div className="bottomPart" >
          <Button
            onClick={() => handleshowparentRoom()}
            color="transparent"
            className="btn"
          >
            apply
          </Button>
        </div>
      </div>
    </>
  );
};

export default RoomsQty;

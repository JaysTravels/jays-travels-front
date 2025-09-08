import React, { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

const PassengersQty = ({
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
  const handleIncrementAdult = () => {
    setValueAdult(valueAdult + 1);
  };
  const handleCabin = (value) => {
    setCabin(value);
    //parentcabin(value);
  };

  const handleDecrementAdult = () => {
    setValueAdult((valueAdult) => (valueAdult > 1 ? valueAdult - 1 : 1));
  };

  const handleChangeAdult = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueAdult(newValue);
    }
  };

  const handleIncrementChildren = () => {
    setValueChildren((prevValue) => prevValue + 1);
  };

  const handleDecrementChildren = () => {
    setValueChildren((prevValue) => (prevValue > 1 ? prevValue - 1 : 0));
  };

  const handleChangeChildren = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueChildren(newValue);
    }
  };

  const handleIncrementInfants = () => {
    setValueInfants((prevValue) => prevValue + 1);
  };

  const handleDecrementInfants = () => {
    setValueInfants((prevValue) => (prevValue > 1 ? prevValue - 1 : 0));
  };

  const handleChangeInfants = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueInfants(newValue);
    }
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
          <Label>adult</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleDecrementAdult()}
            >
              -
            </Button>

            <Input
              type="text"
              value={valueAdult}
              onChange={() => handleChangeAdult()}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleIncrementAdult()}
            >
              +
            </Button>
          </div>
        </div>
        <div className="rowSt mt10">
          <Label>children</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleDecrementChildren()}
            >
              -
            </Button>

            <Input
              type="text"
              value={valueChildren}
              onChange={() => handleChangeChildren()}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleIncrementChildren()}
            >
              +
            </Button>
          </div>
        </div>
        <div className="rowSt mt10">
          <Label>infants</Label>

          <div className="inputGp">
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleDecrementInfants()}
            >
              -
            </Button>
            <Input
              type="text"
              value={valueInfants}
              onChange={() => handleChangeInfants()}
              min="1"
              className="w30px p-0 text-center border-0 rounded-0"
            />
            <Button
              color="transparent"
              className="text-c5"
              onClick={() => handleIncrementInfants()}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flightClass">
          <Label check className="mt7 mb4">
            <Input
              name="flightClass"
              type="radio"
              className="me10"
              onClick={() => {
                handleCabin("economy");
                handleshowparent();
              }}
              checked={selectedClassValue === "economy"}
            />{" "}
            economy
          </Label>
          <Label check className="mt7 mb4">
            <Input
              name="flightClass"
              type="radio"
              className="me10"
              onClick={() => {
                handleCabin("premiumeconomy");
                handleshowparent();
              }}
              checked={selectedClassValue === "premiumeconomy"}
            />{" "}
            premium economy
          </Label>
          <Label check className="mt7 mb4" hidden={true}>
            <Input
              name="flightClass"
              type="radio"
              className="me10"
              onClick={() => {
                handleCabin("basiceconomy");
                handleshowparent();
              }}
              checked={selectedClassValue === "basiceconomy"}
            />{" "}
            basic economy
          </Label>
          <Label check className="mt7 mb4">
            <Input
              name="flightClass"
              type="radio"
              className="me10"
              onClick={() => {
                handleCabin("business");
                handleshowparent();
              }}
              checked={selectedClassValue === "business"}
            />{" "}
            business
          </Label>
          <Label check className="mt7 mb4">
            <Input
              name="flightClass"
              type="radio"
              className="me10"
              onClick={() => {
                handleCabin("first");
                handleshowparent();
              }}
              checked={selectedClassValue === "first"}
            />{" "}
            first
          </Label>
        </div>
        <div className="bottomPart">
          <Button
            onClick={() => handleshowparent()}
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

export default PassengersQty;

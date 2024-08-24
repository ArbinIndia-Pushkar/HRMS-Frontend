// Modal.tsx
import React from "react";
import { Transition } from "@headlessui/react";
import { Box, FormControl, InputLabel } from "@mui/material";
import CalendarWithMultiDateSelector from "./DatePicker";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [details, setDetails] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
    setDetails("");
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg  w-fit flex flex-col">
          <button
            type="button"
            className=" flex justify-end text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4">Apply for Leaves</h2>
          <div className="flex">
            <Box sx={{ minWidth: 120, paddingTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nature</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Nature Of Leaves"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Personal Leave</MenuItem>
                  <MenuItem value={2}>Sick Leave</MenuItem>
                  <MenuItem value={3}>Half Day</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="flex justify-start items-start">
            <CalendarWithMultiDateSelector />
          </div>
          <button
            type="submit"
            className=" bg-HRMSBlack text-HRMSBeige text-l p-3 rounded-md hover:bg-HRMSRed hover:text-HRMSBeige mt-4 w-fit"
            onClick={handleSubmit}
          >
            APPLY
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;

import { PieChart } from "@mui/x-charts/PieChart";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmpDashboard() {
  const username = sessionStorage.getItem("username");
  const leaves = () => {
    toast.dark("Sent for approval", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const attendance = () => {
    toast.dark("Attendance marked", {
      position: "top-center",
      autoClose: 500,
    });
  };
  return (
    <div className="">
      {/* Header - Containd company name and Profile name for now */}
      <div className=" flex justify-between bg-HRMSRed">
        <p className=" text-HRMSBeige p-5 text-xl font-RobotoMono">
          Arbin Instruments
        </p>
        <p className=" text-HRMSBeige p-5 text-xl font-RobotoMono">
          {username}
        </p>
      </div>

      {/* Body div 1 */}
      <div className=" flex justify-between m-5 mt-10">
        {/* Left panel */}

        <div className="flex-1">
          <p className=" mt-14 mb-4 text-4xl">Select Date</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DesktopDatePicker"]}>
              <DemoItem>
                <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <button
            type="submit"
            className=" bg-HRMSBlack text-HRMSBeige text-xl p-3 rounded-md hover:bg-HRMSRed hover:text-HRMSBeige mt-4"
            onClick={attendance}
          >
            Mark Attendance
          </button>
          <ToastContainer />
        </div>

        {/* Right panel */}
        <div className=" flex-col">
          {/* Right Top */}
          <div className=" flex p-4 border border-HRMSBlack">
            {/* Number of Emp */}
            <div className=" text-HRMSBlack font-RobotoMono">
              <p className=" text-xl">Total Employees</p>
              <p className=" text-8xl">20</p>
            </div>

            {/* chart */}
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 9, label: "software", color: "#73c1c0" },
                    { id: 1, value: 4, label: "sales", color: "#1c3b3a" },
                    { id: 2, value: 3, label: "service", color: "#82b7b5" },
                    { id: 3, value: 2, label: "production", color: "#31c3bd" },
                    { id: 4, value: 1, label: "logistics", color: "#1e3534" },
                    { id: 5, value: 2, label: "management", color: "#1e3550" },
                  ],
                },
              ]}
              width={600}
              height={300}
            />
          </div>

          {/* Right Bottom */}

          {/* Mark Attendance and Leave Application buttons */}

          <p className=" mt-14 mb-4 text-4xl">Appy for Leaves</p>
          <div className="flex">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nature</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Nature Of Leaves"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Personal Leave</MenuItem>
                  <MenuItem value={20}>Sick Leave</MenuItem>
                  <MenuItem value={30}>Half Day</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DesktopDatePicker"]}>
                <DemoItem label="From Date">
                  <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
                <DemoItem label="To Date">
                  <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <button
            type="submit"
            className=" bg-HRMSBlack text-HRMSBeige text-xl p-3 rounded-md hover:bg-HRMSRed hover:text-HRMSBeige mt-4"
            onClick={leaves}
          >
            APPLY
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

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
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import CalendarWithMultiDateSelector from "./DatePicker";
import Modal from "./Modal";

export default function EmpDashboard() {
  const username = sessionStorage.getItem("username");

  const attendance = () => {
    toast.dark("Attendance marked", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [leaveNature, setLeaveNature] = useState<string>("");
  const [details, setDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  const calculateDays = () => {
    // Using a Set to get unique dates
    const uniqueDates = new Set(
      selectedDates.map((date) => date.toDateString())
    );
    return uniqueDates.size;
  };

  const leaveRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/leave-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details }),
    });

    if (response.ok) {
      alert("Leave request submitted successfully!");
      setDetails("");
    } else {
      alert("Failed to submit leave request.");
    }
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

          <button
            className="flex  bg-HRMSBlack text-HRMSBeige text-xl p-3 rounded-md hover:bg-HRMSRed hover:text-HRMSBeige  mt-14 mb-4"
            onClick={openModal}
          >
            Apply for Leaves
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={leaveRequest}
          ></Modal>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

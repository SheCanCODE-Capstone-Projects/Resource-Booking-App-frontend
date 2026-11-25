
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    CalendarDays,
    Clock,
    Users,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

function BookingForm({ resource }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [attendees, setAttendees] = useState(1);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const today = new Date().toLocaleDateString("en-CA");

    function handleBooking(event) {
        event.preventDefault();

        setMessage("");
        setMessageType("");

        if (!date || !startTime || !endTime) {
            setMessage("Please complete all booking fields.");
            setMessageType("error");
            return;
        }

        if (date < today) {
            setMessage("Please select a future date.");
            setMessageType("error");
            return;
        }

        if (startTime >= endTime) {
            setMessage("End time must be later than start time.");
            setMessageType("error");
            return;
        }

        if (
            !Number.isInteger(Number(attendees)) ||
            Number(attendees) < 1 ||
            Number(attendees) > Number(resource.capacity)
        ) {
            setMessage(
                `Please enter a number of attendees between 1 and ${resource.capacity}.`
            );
            setMessageType("error");
            return;
        }

        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: {
                        pathname: `/resources/${resource.id}`,
                    },
                    booking: {
                        date,
                        startTime,
                        endTime,
                        attendees,
                    },
                },
            });
            return;
        }

        setMessage(
            "Your booking details are valid. Reservation submission will be connected to the backend."
        );
        setMessageType("success");
    }

    return (
        <form onSubmit={handleBooking} className="mt-5 space-y-5">

            <div>
                <label
                    htmlFor="booking-date"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                >
                    <CalendarDays size={17} />
                    Booking date
                </label>

                <input
                    id="booking-date"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="w-full rounded-xl border border-[#1B3F36]/20 bg-white px-4 py-3 text-sm text-[#1B3F36] outline-none focus:border-[#8B4A33] dark:border-white/10 dark:bg-[#1A2923] dark:text-[#F5F1E6]"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label
                        htmlFor="start-time"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                    >
                        <Clock size={16} />
                        Start time
                    </label>

                    <input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                        className="w-full rounded-xl border border-[#1B3F36]/20 bg-white px-3 py-3 text-sm text-[#1B3F36] outline-none focus:border-[#8B4A33] dark:border-white/10 dark:bg-[#1A2923] dark:text-[#F5F1E6]"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="end-time"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                    >
                        <Clock size={16} />
                        End time
                    </label>

                    <input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                        className="w-full rounded-xl border border-[#1B3F36]/20 bg-white px-3 py-3 text-sm text-[#1B3F36] outline-none focus:border-[#8B4A33] dark:border-white/10 dark:bg-[#1A2923] dark:text-[#F5F1E6]"
                        required
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="attendees"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                >
                    <Users size={17} />
                    Number of attendees
                </label>

                <input
                    id="attendees"
                    type="number"
                    min="1"
                    max={resource.capacity || undefined}
                    value={attendees}
                    onChange={(event) => setAttendees(event.target.value)}
                    className="w-full rounded-xl border border-[#1B3F36]/20 bg-white px-4 py-3 text-sm text-[#1B3F36] outline-none focus:border-[#8B4A33] dark:border-white/10 dark:bg-[#1A2923] dark:text-[#F5F1E6]"
                    required
                />

                <p className="mt-2 text-xs text-[#59665F] dark:text-[#B9C5BE]">
                    Maximum capacity: {resource.capacity || "Not specified"}
                </p>
            </div>

            {message && (
                <div
                    role="alert"
                    className={`flex items-start gap-3 rounded-xl p-4 text-sm ${messageType === "error"
                            ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                            : "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                        }`}
                >
                    {messageType === "error" ? (
                        <AlertCircle size={18} className="shrink-0" />
                    ) : (
                        <CheckCircle2 size={18} className="shrink-0" />
                    )}

                    <p>{message}</p>
                </div>
            )}

            <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33] focus:outline-none focus:ring-2 focus:ring-[#8B4A33] focus:ring-offset-2"
            >
                Reserve this space
            </button>

            <p className="text-center text-xs leading-5 text-[#59665F] dark:text-[#B9C5BE]">
                Submitting this form currently validates your details only.
                Your reservation is not confirmed until backend integration.
            </p>
        </form>
    );
}

export default BookingForm;

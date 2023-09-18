/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/Button";
import EmptyState from "@/components/states/EmptyState";
import { SelectField } from "@/components/Fields";
import UserDashboardLayout from "@/components/layouts/UserDashboardLayout";
import LoadingState from "@/components/states/LoadingState";
import useAuth from "@/hooks/useAuth";
import useReservations from "@/hooks/useReservations";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { generateStartsAndEndsAtDate } from "@/utils/date";

interface ISlot {
    date: string//format : YYYY-MM-DD
    hour: string //format : HH (24-hour format)
    slot: {
        starts: number,
        ends: number,
    }
}

// hour : HH format
const formatTimeRangeToHour = (timeRange: string): string => {
    const starts = timeRange.split('-')[0].trim();
    let hour = starts.split(':')[0];
    if (hour.length === 1) {
        hour = `0${hour}`;
    }
    return hour;
}


export default function NewReservation() {
    const { creatingReservation, createReservation, getReservationsForHour } = useReservations();
    const [selectedSlots, setSelectedSlots] = useState<ISlot[]>([]);
    const { user } = useAuth();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeRange, setTimeRange] = useState('0:00 AM - 1:00 AM');
    // available slots
    const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
    const [gettingReservationsForHour, setGettingReservationsForHour] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    useEffect(() => {
        const hour = formatTimeRangeToHour(timeRange);
        const chechAvailableSlots = async () => {
            setGettingReservationsForHour(true);
            // get reserved slots first

            /*
            export interface IReservation {
                _id: string;
                createdBy: IAuthUser;
                startsAt: string;
                endsAt: string;
            }
            */
            const reservedSlots = await getReservationsForHour(date, hour);

            // set available slots as 4 slots of 15 minutes each (0-15, 15-30, 30-45, 45-60) but remove the reserved slots
            const availableSlots = [...Array(4)].map((_, i) => {
                const slot = {
                    date,
                    hour,
                    slot: {
                        starts: i * 15,
                        ends: (i + 1) * 15
                    }
                }
                return slot;
            }).filter(slot => {
                const { startsAt, endsAt } = generateStartsAndEndsAtDate(slot.date, slot.hour, slot.slot);
                return !reservedSlots?.find(reservedSlot => {
                    reservedSlot.startsAt === startsAt.toISOString() && reservedSlot.endsAt === endsAt.toISOString();
                })
            });

            setAvailableSlots(availableSlots);
            setGettingReservationsForHour(false);
        }
        chechAvailableSlots();
    }, [date, timeRange]);
    

    useEffect(() => {
        console.log("selectedSlots", selectedSlots);
        console.log("availableSlots", availableSlots);
    }, [selectedSlots, availableSlots]);
    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid - New Reservation</title>
            </Head>
            <header className="px-4">
                <div className='space-y-3'>
                    <h1 className="text-xl font-semibold leading-6 text-gray-700">
                        New Reservation
                    </h1>
                    <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                        You can reserve one or more 15-minutes slots from here.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500">
                        <FiAlertTriangle className="text-red-500" />
                        <p>Note that you have <span className="font-semibold">{user?.availableTime} minutes</span></p>
                    </div>
                </div>
            </header>
            <main className="w-full mt-10 flex min-h-[60vh]">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="px-4 space-y-6 w-1/2 border-r-2"
                >
                    <SelectField
                        className="col-span-full"
                        label="Select Date"
                        id="date"
                        name="date"
                        value={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                    >
                        {[...Array(30)].map((_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() + i);
                            return <option key={i} value={date.toISOString().split('T')[0]}>{date.toISOString().split('T')[0]}</option>
                        })}
                    </SelectField>

                    <SelectField
                        className="col-span-full"
                        label="Select Time Range"
                        id="timeRange"
                        name="timeRange"
                        value={timeRange}
                        required
                    >
                        {[...Array(24)].map((_, i) => {
                            const range = i < 12 ? `${i}:00 AM - ${i + 1}:00 AM` : `${i - 12}:00 PM - ${(i + 1) - 12}:00 PM`;
                            return <option key={i} value={range}>{range}</option>
                        })}
                        onChange={(e) => setTimeRange(e.target.value)}
                    </SelectField>

                    <div className='col-span-full '>
                        <p className="mb-3 block text-sm font-medium text-gray-700"> Available Time Slots</p>
                        {(availableSlots.length > 0 && !gettingReservationsForHour) && <div className="grid grid-cols-2 gap-4 w-full ">
                            {availableSlots.map((slot, i) => {
                                const timeSlot = `${slot.slot.starts}-${slot.slot.ends}`;
                                return (
                                    <div key={i} className={`flex justify-between items-center border border-gray-200 p-2 text-sm rounded ${selectedSlots.includes(slot) ? "bg-blue-100" : ""
                                        }`}>
                                        <span>{timeSlot}</span>
                                        <button className={`${selectedSlots.includes(slot) ? "bg-red-400" : "bg-blue-500"} text-white rounded-full p-1`}
                                            onClick={() => {
                                                if (selectedSlots.includes(slot)) {
                                                    const newSelectedSlots = selectedSlots.filter(selectedSlot => selectedSlot !== slot);
                                                    setSelectedSlots(newSelectedSlots);
                                                    return;
                                                }
                                                setSelectedSlots([...selectedSlots, slot]);

                                            }}
                                        >
                                            {selectedSlots.includes(slot) ?
                                                <FiX className="h-6 w-6" />
                                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>

                                            }
                                        </button>
                                    </div>
                                )
                            })}
                        </div>}
                        {
                            (availableSlots.length === 0 && !gettingReservationsForHour) && <EmptyState minHeight="min-h-[10vh]" message={`no available slots between ${timeRange} `} />
                        }
                        {
                            gettingReservationsForHour && <LoadingState message={`getting time available timeslots between ${timeRange} `} />
                        }
                    </div>
                </form>
                <div className="w-1/2 h-full space-y-5  px-4">
                    <h1 className="text-xl font-semibold leading-6 text-gray-700 capitalize">
                        selected slots
                    </h1>
                    {
                        selectedSlots.length === 0 && <EmptyState minHeight="min-h-[15vh]" message="you haven't selected any slot" />
                    }
                    {
                        selectedSlots.length > 0 && <div className="grid grid-cols-2 gap-4 w-full ">
                            {
                                selectedSlots.map((slot, i) => (
                                    <div key={i} className="bg-gray-50 p-2 rounded-md shadow-md flex flex-col gap-1">
                                        <p>Date : {slot.date}</p>

                                        <p>Time : {slot.hour} {Number(slot.hour) > 12 ? "PM " : "AM"}</p>
                                        <p>Minutes : {slot.slot.starts + "-" + slot.slot.ends}</p>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        selectedSlots.length > 0 && <Button variant="solid" color="blue">
                            <span>Confirm Reservation{selectedSlots.length > 1 && "s"}</span>
                        </Button>
                    }
                </div>
            </main>
        </UserDashboardLayout>
    )
}
import NavigationComponent from '@/components/navigation';
import { Form, router } from '@inertiajs/react';
import { IconButton } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Dates {
    date: string;
    title: string;
    description: string;
    color: string;
    id: number;
}

interface CalendarProps {
    dates: Dates[];
    filter: string;
    date: Date;
}

export default function Calendar({ dates, filter, date }: CalendarProps) {
    const selectedDate = date ? new Date(date) : new Date();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get('/', { filter: e.target.value });
    };

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8">
                <h1 className="text-4xl font-semibold">Calendar</h1>
                <div className="mt-20 w-full max-w-md">
                    <h2 className='text-2xl font-semibold mb-4'>Plan an event</h2>
                    <Form method="post" action="/submit-event">
                        <input type="text" name="title" placeholder="Event Title" className="mb-4 rounded border border-gray-300 px-3 py-2 w-full" required />
                        <textarea name="description" placeholder="Event Description" className="mb-4 rounded border border-gray-300 px-3 py-2 w-full" />
                        <label className="mr-3 text-lg font-medium">Color</label>
                        <input type="color" name="color" className="mb-4 rounded border border-gray-300 px-5 py-1 w-4/5" required />
                        <label className="mr-3 text-lg font-medium">Date</label>
                        <input type="datetime-local" name="date" className="mb-4 rounded border border-gray-300 px-3 py-2 w-4/5" required />
                        <button
                            type='submit'
                            className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:opacity-50 w-full"
                        >
                            Submit Date
                        </button>
                    </Form>
                </div>
                <div className="mt-20 w-full max-w-md">
                    <div className="flex items-center mb-4">
                        <h2 className="text-2xl font-semibold">Planned events</h2>
                        <select value={filter} onChange={handleFilterChange} className="ml-auto rounded border border-gray-300 px-3 py-2">
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                    <NavigationComponent selectedDate={selectedDate} filter={filter} />
                    {filter === 'day' ? (
                        <div>
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                                const eventsAtHour = dates.filter(e => {
                                    const eventDate = new Date(e.date);
                                    return (
                                        eventDate.getHours() === hour &&
                                        eventDate.toDateString() === selectedDate.toDateString()
                                    );
                                });
                                return (
                                    <div key={hour} className="border rounded mb-2 p-2">
                                        <p className="text-sm text-gray-500">
                                            {hour.toString()}:00
                                        </p>

                                        {eventsAtHour.map(event => (
                                            <div key={event.id} className="flex items-center">
                                                <span className="rounded-xl w-2 h-2 mr-3" style={{ backgroundColor: event.color }}></span>
                                                <span className="font-semibold">{event.title}</span>
                                                <span className='ml-auto'><IconButton href={`/event/${event.id}`}><VisibilityIcon /></IconButton></span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>) : filter === 'week' ? (
                            <div>
                                {Array.from({ length: 7 }, (_, i) => {
                                    const day = new Date(selectedDate);
                                    const startOfWeek = new Date(day);
                                    startOfWeek.setDate(day.getDate() - day.getDay());

                                    const currentDay = new Date(startOfWeek);
                                    currentDay.setDate(startOfWeek.getDate() + i + 1);

                                    const dayEvents = dates.filter(e =>
                                        new Date(e.date).toDateString() === currentDay.toDateString()
                                    );

                                    return (
                                        <div key={i} className="border rounded mb-2 p-2">
                                            <p className="text-sm text-gray-500">
                                                {currentDay.toLocaleDateString(undefined, { weekday: 'long' })}
                                            </p>

                                            {dayEvents.map(event => (
                                                <div key={event.id} className="flex items-center">
                                                    <span className="rounded-xl w-2 h-2 mr-3" style={{ backgroundColor: event.color }}></span>
                                                    <span className="font-semibold">{event.title}</span>
                                                    <span className='ml-auto'><IconButton href={`/event/${event.id}`}><VisibilityIcon /></IconButton></span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : filter === 'month' ? (
                            <div>
                                {Array.from({ length: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                                    const day = new Date(
                                        selectedDate.getFullYear(),
                                        selectedDate.getMonth(),
                                        i + 1
                                    );

                                    const dayEvents = dates.filter(e =>
                                        new Date(e.date).toDateString() === day.toDateString()
                                    );

                                    return (
                                        <div key={i} className="border rounded mb-2 p-2 w-full">
                                            <p className="text-sm text-gray-500">{i + 1}</p>

                                            {dayEvents.map(event => (
                                                <div key={event.id} className="flex items-center">
                                                    <span className="rounded-xl w-2 h-2 mr-3" style={{ backgroundColor: event.color }}></span>
                                                    <span className="font-semibold">{event.title}</span>
                                                    <span className='ml-auto'><IconButton href={`/event/${event.id}`}><VisibilityIcon /></IconButton></span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>

                        ) : (<p className="text-gray-500">No filter selected.</p>)}
                </div>
            </div>
        </>
    );
}

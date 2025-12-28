import { Icon, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Dates {
    date: string;
    title: string;
    description: string;
    color: string;
    id: number;
}

interface EventProps {
    date: Dates;
}

export default function Event({ date }: EventProps) {

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8">
                <div className="w-1/3">
                    <IconButton href="/"><ArrowBackIcon /></IconButton>
                    <h1 className="text-center text-4xl font-semibold">Event</h1>
                    <h2 className='mt-20 text-2xl font-semibold mb-4'>{date.title}</h2>
                    <h2 className='text-2xl font-semibold mb-4'>{new Date(date.date).toLocaleString()}</h2>
                    {date.description ? <p className='mb-4 text-gray-600'>{date.description}</p> : <p className="mb-4 text-gray-600">No description provided.</p>}
                    <div>
                        <IconButton><EditIcon /></IconButton>
                        <IconButton href={`/delete-event/${date.id}`}><DeleteIcon /></IconButton>
                    </div>
                </div>
            </div>
        </>
    );
}

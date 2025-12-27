
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { router } from '@inertiajs/react';

interface NavigationProps {
    selectedDate: Date;
    filter: string;
}

export default function NavigationComponent({ selectedDate, filter }: NavigationProps) {
    const handlePrev = () => {
        const newDate = new Date(selectedDate);
        if (filter === 'day') {
            newDate.setDate(newDate.getDate() - 1);
        } else if (filter === 'week') {
            newDate.setDate(newDate.getDate() - 7);
        } else if (filter === 'month') {
            newDate.setMonth(newDate.getMonth() - 1);
        }

        router.get('/', {
            filter: filter,
            date: newDate.toISOString().split('T')[0]
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleNext = () => {
        const newDate = new Date(selectedDate);
        if (filter === 'day') {
            newDate.setDate(newDate.getDate() + 1);
        } else if (filter === 'week') {
            newDate.setDate(newDate.getDate() + 7);
        } else if (filter === 'month') {
            newDate.setMonth(newDate.getMonth() + 1);
        }

        router.get('/', {
            filter: filter,
            date: newDate.toISOString().split('T')[0]
        }, {
            preserveState: true,
            preserveScroll: true
        });
    }

    return (
        <div className='flex'>
            <div className='flex items-center'>
                <span className="text-gray-500">{"Showing events for:"}</span>
                <span className="font-semibold ml-1">
                    {
                        filter === "day" ? `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`
                            : filter === "week" ? `Week of ${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`
                                : filter === "month" ? `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`
                                    : ''
                    }
                </span>
            </div>
            <div className="ml-auto">
                <IconButton onClick={handlePrev}><ArrowBackIosIcon /></IconButton>
                <IconButton onClick={handleNext}><ArrowForwardIosIcon /></IconButton>
            </div>
        </div>
    )
}
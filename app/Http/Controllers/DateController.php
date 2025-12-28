<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Date;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('filter', 'month');
        $selectedDate = Carbon::parse($request->query('date', now()));
        $query = Date::query();

        match ($filter) {
            'day' => $query->whereDate('date', $selectedDate),

            'week' => $query->whereBetween('date', [
                $selectedDate->copy()->startOfWeek(),
                $selectedDate->copy()->endOfWeek(),
            ]),
        
            default => $query
                ->whereMonth('date', $selectedDate->month)
                ->whereYear('date', $selectedDate->year),
        };

        return Inertia::render('calendar', [
            'dates' => $query->orderBy('date', 'asc')->get(),
            'filter' => $filter,
            'date' => $request->query('date', now()->toDateString()),
        ]);
    }

    public function event(Request $request, $id)
    {
        return Inertia::render('event', [
            'date' => Date::find($id),
        ]);
    }

    public function submitEvent(Request $request)
    {
        $data = $request->validate([
            'date' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string|max:7',
        ]);

        $date = Carbon::parse($data['date']);

        $startOfMinute = $date->copy()->subHours(2);
        $endOfMinute = $date->copy()->addHours(2);

        if (Date::whereBetween('date', [$startOfMinute, $endOfMinute])->exists()) {
            return back()->withErrors([
                'date' => 'An event already exists at this time.'
            ]);
        }

        Date::create($data);

        return redirect('/');
    }

    public function deleteEvent(Request $request, $id)
    {
        $date = Date::find($id);
        $date->delete();

        return redirect('/');
    }
}

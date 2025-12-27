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

    public function submitDate(Request $request)
    {
        $data = $request->validate([
            'date' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string|max:7',
        ]);

        Date::create($data);

        return redirect('/');
    }
}

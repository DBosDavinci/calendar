<?php

namespace App\Http\Controllers;

use App\Models\Date;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('filter', 'month');
        $query = Date::query();

        switch ($filter) {
            case 'day':
                $query->whereDate('date', now()->toDateString());
                break;
            case 'week':
                $query->whereBetween('date', [now()->startOfWeek(), now()->endOfWeek()]);
                break;
            case 'month':
            default:
                $query->whereMonth('date', now()->month)
                      ->whereYear('date', now()->year);
                break;
        }

        return Inertia::render('calendar', [
            'dates' => $query->orderBy('date', 'asc')->get(),
            'filter' => $filter
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

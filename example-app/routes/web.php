<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DateController;

Route::get('/', [DateController::class, 'index'])->name('calendar');

Route::post('/submit-date', [DateController::class, 'submitDate']);
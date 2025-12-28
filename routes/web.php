<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DateController;

Route::get('/', [DateController::class, 'index'])->name('calendar');

Route::post('/submit-event', [DateController::class, 'submitEvent']);
Route::get('/event/{id}', [DateController::class, 'event'])->name('event');
Route::get('/delete-event/{id}', [DateController::class, 'deleteEvent']);
<?php

namespace App\Http\Controllers\Back\Auth;

use App\Http\Controllers\Back\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function redirectTo()
    {
        return route('admin.dashboard');
    }

    public function showLoginForm()
    {
        return view('back.auth.login');
    }

    public function username()
    {
        return 'username';
    }

    protected function guard()
    {
        return Auth::guard('admin');
    }
}

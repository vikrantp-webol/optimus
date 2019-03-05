<?php

namespace App\Http\Controllers\Admin\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function redirectTo()
    {
        return route('admin.dashboard');
    }

    public function showLoginForm()
    {
        return view('admin.auth.login');
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

<?php

namespace App\Http\Controllers\Back\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Back\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest:admin')->except('logout');
    }

    public function redirectTo()
    {
        return route('admin');
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

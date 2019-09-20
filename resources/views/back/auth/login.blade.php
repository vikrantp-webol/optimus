@extends('back.layouts.master')

@section('content')
    <section class="bg-gradient-login flex min-h-screen flex-col p-8">
        <div class="w-full m-auto max-w-sm shadow-styled">
            <div class="text-center bg-white rounded-t px-6 py-12 md:px-12">
                <h1
                    class="title text-5xl font-bold text-blue-600 uppercase"
                >Optimus</h1>

                <h2 class="subtitle text-coral-500">
                    <i>Managing your content</i>
                </h2>
            </div>

            <div class="bg-blue-700 rounded-b px-6 py-12 md:px-12">
                <form method="post" action="{{ route('admin.login') }}">
                    @csrf

                    @include('back.partials.errors')

                    <div class="mb-4">
                        <label for="Username" class="hidden">Username</label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            class="input"
                            required
                            autofocus
                            placeholder="Username"
                        >
                    </div>

                    <div class="mb-4">
                        <label for="Password" class="hidden">Password</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            class="input"
                            required
                            placeholder="Password"
                        >
                    </div>
                    
                    <button
                        type="submit"
                        class="button coral w-full"
                    >Login</button>
                </form>
            </div>
        </div>

        <div class="text-center md:text-right pt-10">
            <img
                src="/back/images/optix-logo.svg"
                alt="Optix Solutions"
                class="inline"
            >
        </div>
    </section>
@endsection

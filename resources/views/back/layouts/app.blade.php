@extends('back.layouts.master')

@section('content')
    <div id="app">
        <vue-app
            :user="{{ json_encode(auth('admin')->user()) }}"
        ></vue-app>
    </div>

    <script src="{{ mix('/back/js/app.js') }}"></script>
@endsection

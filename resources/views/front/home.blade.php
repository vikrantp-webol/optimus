@extends('front.layouts.app', ['homePage' => true])

@section('meta.title', 'Home')
{{-- @section('meta.description', ) --}}

@section('content')
    <div class="max-w-4xl mx-auto py-16">
        <div class="content">
            <h1 class="title">Hello</h1>
            <h2 class="subtitle">World</h2>
        </div>
    </div>
    
@endsection
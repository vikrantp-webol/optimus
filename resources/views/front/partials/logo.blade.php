@php($tag = $tag ?? 'span')

<{{ $tag }}>
    <a href="/" title="{{ config('app.name') }}"{{ isset($class) ? ' class="' . $class . '"' : null }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="150" viewBox="0 0 150 100">
            {{-- Path --}}
        </svg>
    </a>
</{{ $tag }}>

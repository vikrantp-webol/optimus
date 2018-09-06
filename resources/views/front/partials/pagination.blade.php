@if($paginator->hasPages())
    <nav class="pagination is-centered">
        {{-- Previous Page Link --}}
        @if($paginator->onFirstPage())
            <a class="button is-secondary pagination-previous" disabled>
                <span class="icon">
                    <icon icon="angle-left"></icon>
                </span>
            </a>
        @else
            <a href="{{ $paginator->previousPageUrl() }}" class="button is-secondary pagination-previous">
                <span class="icon">
                    <icon icon="angle-left"></icon>
                </span>
            </a>
        @endif

        {{-- Next Page Link --}}
        @if($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" class="button is-secondary pagination-next">
                <span class="icon">
                    <icon icon="angle-right"></icon>
                </span>
            </a>
        @else
            <a class="button is-secondary pagination-next" disabled>
                <span class="icon">
                    <icon icon="angle-right"></icon>
                </span>
            </a>
        @endif

        {{-- Pagination Elements --}}
        <ul class="pagination-list">
            @foreach($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if(is_string($element))
                    <li><span class="pagination-ellipsis">{{ $element }}</span></li>
                @endif

                {{-- Array Of Links --}}
                @if(is_array($element))
                    @foreach($element as $page => $url)
                        @if($page == $paginator->currentPage())
                            <li><a class="pagination-link is-current">{{ $page }}</a></li>
                        @else
                            <li><a href="{{ $url }}" class="pagination-link">{{ $page }}</a></li>
                        @endif
                    @endforeach
                @endif
            @endforeach
        </ul>
    </nav>
@endif

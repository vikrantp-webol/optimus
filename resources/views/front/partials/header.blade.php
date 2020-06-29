@include('front.partials.navigation.mobile')

<header>
    <div class="container p-4">
        <span
            class="hamburger lg:hidden"
            @click="showMobileNavigation"
        >
            <span class="hamburger-holder">
                <span class="hamburger-inner"></span>
            </span>
        </span>

        @include('front.partials.logo', [
            'tag' => isset($homePage) ? 'h1' : 'span',
        ])

        @include('front.partials.navigation.main')
    </div>
</header>

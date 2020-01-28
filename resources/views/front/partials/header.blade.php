<site-header inline-template>
    <header>
        @include('front.partials.navigation.mobile')

        <span
            class="hamburger"
            @click="toggleMobileNavigation"
            :class="{ 'active': mobileNavigationIsVisible }"
        >
            <span class="hamburger-holder">
                <span class="hamburger-inner"></span>
            </span>
        </span>

        @include('front.partials.logo', [
            'tag' => isset($homePage) ? 'h1' : 'span',
        ])

        @include('front.partials.navigation.main')
    </header>
</site-header>

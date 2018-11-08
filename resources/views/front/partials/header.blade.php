<header>
    <span
        class="hamburger"
        @click="toggleNav"
        :class="{ 'active': navIsActive }"
    >
        <span class="hamburger-holder">
            <span class="hamburger-inner"></span>
        </span>
    </span>

    @include('front.partials.logo')
</header>

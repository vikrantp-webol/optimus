<mobile-navigation
    v-if="mobileNavigationIsVisible"
    v-cloak
    @close="closeMobileNavigation"
>
    <ul class="mobile-nav">
        <li>
            <a href="">Top level</a>
        </li>

        <collapsible-nav-item
            title="Top level with sub"
            href=""
        >
            <li>
                <a href="">Sub Level</a>
            </li>
        </collapsible-nav-item>
    </ul>
</mobile-navigation>

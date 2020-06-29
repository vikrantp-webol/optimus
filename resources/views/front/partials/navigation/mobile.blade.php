<mobile-navigation v-cloak>
    <ul class="mobile-navigation">
        <collapsible-nav-item
            title="About"
            href="/"
        >
            @foreach(range(1, 5) as $i)
                <li>
                    <a href="/default">
                        Example Link
                    </a>
                </li>
            @endforeach
        </collapsible-nav-item>

        <li>
            <a href="">
                Default
            </a>
        </li>

        <li>
            <a href="/contact">
                Contact Us
            </a>
        </li>
    </ul>
</mobile-navigation>

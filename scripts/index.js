(function onWindowLoad() {
    function getPageName(url) {
        return url.split('/').pop();
    }

    function setPageLoadTime(timestamp) {
        const pageLoadTimeElement = document.querySelector('.page-load__time')
        pageLoadTimeElement.textContent = timestamp;
    }

    function setActiveLink() {
        const currentPage = getPageName(window.location.pathname)

        const navigationLinkClass = 'header-navigation__link'

        const navigationLinks = [...document.getElementsByClassName(navigationLinkClass)];

        const navigationLink = navigationLinks.find(nv => getPageName(nv.pathname) === currentPage);

        if (navigationLink) {
            const activeNavigationLinkClass = 'header-navigation__link_active'

            navigationLink.classList.add(activeNavigationLinkClass);
        }
    }

    window.addEventListener('load', (event) => {
        setPageLoadTime((event.timeStamp | 0) / 1000)
        setActiveLink();
    });
})();

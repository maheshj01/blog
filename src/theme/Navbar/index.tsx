import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import IconButton from '@site/src/components/common/IconButton';
import { Icon } from '@iconify/react';

export default function Navbar(): React.ReactNode {
    const { siteConfig } = useDocusaurusContext();
    const { colorMode, setColorMode } = useColorMode();
    const { navbar } = useThemeConfig();
    const [mobileOpen, setMobileOpen] = useState(false);

    const title = navbar?.title ?? siteConfig.title;
    const logoSrc = navbar?.logo?.src;
    const items = (navbar?.items ?? []) as Array<any>;

    const toggleColorMode = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');
    const theme = colorMode === 'dark' ? 'dark' : 'light';

    return (
        <header className="navbar sticky top-0 z-50 bg-white backdrop-blur-md border-b border-black/5 dark:border-white/10">
            <div className="h-16 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-base font-semibold text-black">
                        {title}
                    </Link>
                </div>

                <IconButton
                    tooltipPlacement='bottom-end'
                    ariaLabel={
                        theme === 'dark' ? 'Light Mode' : 'Dark Mode'

                    } onClick={() => {
                        toggleColorMode();
                    }}>
                    {theme === 'dark' ? (
                        <Icon icon="material-symbols:wb-sunny-rounded" className="text-black" width="24" height="24" />
                    ) : (
                        <Icon icon="ic:baseline-dark-mode" className="text-black" width="24" height="24" />
                    )}
                </IconButton>
            </div>
        </header>
    );
}

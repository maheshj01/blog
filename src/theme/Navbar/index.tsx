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
        <header className="navbar min-w-full sticky top-0 z-50 backdrop-blur-md border-b border-black/5 dark:border-white/10 w-full">
            <div className="h-16 w-full flex items-center justify-between px-4">
                <div className="flex items-center">
                    <Link to="/" className="text-base font-semibold text-black">
                        {title}
                    </Link>
                </div>
                <div className="flex items-center">
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
            </div>
        </header>
    );
}

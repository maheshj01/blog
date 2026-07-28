import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import IconButton from '../../components/common/IconButton';
import { Icon } from '@iconify/react';

export default function Navbar(): React.ReactNode {
    const { siteConfig } = useDocusaurusContext();
    const { colorMode, setColorMode } = useColorMode();
    const { navbar } = useThemeConfig();

    const title = navbar?.title ?? siteConfig.title;

    const toggleColorMode = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');
    const theme = colorMode === 'dark' ? 'dark' : 'light';

    return (
        <header className="navbar min-w-full sticky top-0 z-50 w-full">
            <div className="h-16 w-full max-w-[900px] mx-auto flex items-center justify-between px-5">
                <Link
                    to="/"
                    className="flex items-center gap-2 no-underline hover:no-underline"
                    style={{ color: 'var(--ink)' }}
                >
                    <span
                        aria-hidden="true"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--brand)',
                            fontWeight: 600,
                        }}
                    >
                        ~/
                    </span>
                    <span
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {title}
                    </span>
                </Link>

                <div className="flex items-center gap-1">
                    <IconButton
                        tooltipPlacement="bottom-end"
                        ariaLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={toggleColorMode}
                    >
                        {theme === 'dark' ? (
                            <Icon icon="material-symbols:wb-sunny-rounded" width="22" height="22" style={{ color: 'var(--ink)' }} />
                        ) : (
                            <Icon icon="ic:baseline-dark-mode" width="22" height="22" style={{ color: 'var(--ink)' }} />
                        )}
                    </IconButton>
                </div>
            </div>
        </header>
    );
}

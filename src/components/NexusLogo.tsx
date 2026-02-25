interface NexusLogoProps {
    /** Width/height in pixels */
    size?: number;
    className?: string;
}

/**
 * Reusable Nexus AI logo component (inline SVG).
 * To update the logo everywhere, edit this single component.
 */
export function NexusLogo({ size = 32, className = "" }: NexusLogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            width={size}
            height={size}
            className={className}
        >
            <rect width="64" height="64" rx="12" fill="#0B0F19" />
            <path d="M18 46V18h5.5l16.5 20V18H45v28h-5.5L23 26v20H18z" fill="#00DC82" />
        </svg>
    );
}

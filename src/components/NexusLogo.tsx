interface NexusLogoProps {
    /** Width in pixels (height auto-scales to keep aspect ratio) */
    size?: number;
    className?: string;
}

/**
 * Reusable Nexus AI logo component.
 * References /nexus-logo.svg from public/ — change that single file to update everywhere.
 */
export function NexusLogo({ size = 32, className = "" }: NexusLogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/nexus-logo.svg"
            alt="Nexus AI"
            width={size}
            height={size}
            className={className}
        />
    );
}

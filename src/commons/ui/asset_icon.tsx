/**
 * AssetIcon — renders any SVG from /assets/ using CSS mask-image.
 * Inherits the EXACT parent text color via `currentColor` (no filter approximation).
 *
 * Usage:
 *   <AssetIcon src="/assets/icons/dashboard/temple_icon.svg" className="w-5 h-5" />
 */

interface AssetIconProps {
  src: string;
  className?: string;
}

const AssetIcon = ({ src, className = 'w-5 h-5' }: AssetIconProps) => (
  <span
    className={`inline-block flex-shrink-0 ${className}`}
    style={{
      backgroundColor: 'currentColor',
      maskImage: `url(${src})`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: `url(${src})`,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
    }}
  />
);

export default AssetIcon;

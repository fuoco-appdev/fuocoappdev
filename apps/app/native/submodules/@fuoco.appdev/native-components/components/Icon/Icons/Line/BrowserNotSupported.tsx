import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.525 5.31v10.5l1.95 1.95c.03-.15.05-.3.05-.45v-12c0-1.1-.9-2-2-2h-12.5l2 2h10.5Z" />
    <Path d="M3.745 2.63 2.475 3.9l1.05 1.05v12.36c0 1.1.9 2 2 2h12.36l2.06 2.06 1.27-1.27L3.745 2.63Zm1.78 14.68V6.95l10.36 10.36H5.525Z" />
  </Svg>
)

export default Icon

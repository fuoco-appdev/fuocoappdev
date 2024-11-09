import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 11.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3Zm0-17c-3.9 0-7.44 1.59-10 4.15l5 5a7.06 7.06 0 0 1 10-.01l5-5C19.44 4.09 15.9 2.5 12 2.5Zm4.84 6.47c-1.44-.91-3.1-1.4-4.84-1.4-1.74 0-3.41.49-4.85 1.41L4.94 6.76C6.99 5.29 9.44 4.5 12 4.5c2.56 0 5 .79 7.05 2.26l-2.21 2.21Z" />
  </Svg>
)

export default Icon

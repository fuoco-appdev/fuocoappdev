import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.6 9.791 1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0l-1.88-3.24a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83l1.84 3.18a10.78 10.78 0 0 0-5.4 8.52h22a10.78 10.78 0 0 0-5.4-8.52ZM7 15.561a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
  </Svg>
)

export default Icon

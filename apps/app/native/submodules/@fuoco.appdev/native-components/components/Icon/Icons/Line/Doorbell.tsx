import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11 16.5h2c0 .55-.45 1-1 1s-1-.45-1-1Zm4-1.5v-2.34c0-1.54-.81-2.82-2.25-3.16v-.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.25C9.82 9.84 9 11.12 9 12.66V15H8v1h8v-1h-1Zm-3-9.5L6 10v9h12v-9l-6-4.5ZM12 3l8 6v12H4V9l8-6Z" />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.63 15.13 19.5 3h-4V2h-4v1h-5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2.23l.64 4.13c-1.13.92-1.87 2.3-1.87 3.87v1c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1c0-1.57-.74-2.95-1.87-3.87ZM6.5 9V5h1.31l.62 4H6.5Zm10.67-4-1.38 9h-4.57L9.83 5h7.34Zm.33 15h-8v-1c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3v1Z" />
    <Path d="M13.5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
)

export default Icon

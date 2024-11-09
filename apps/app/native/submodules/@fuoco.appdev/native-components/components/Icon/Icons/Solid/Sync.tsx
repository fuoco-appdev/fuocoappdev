import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M11.52 1v3c4.243 0 7.68 3.58 7.68 8a8.18 8.18 0 0 1-1.19 4.26l-1.402-1.46c.432-.83.672-1.79.672-2.8 0-3.31-2.582-6-5.76-6v3L7.68 5l3.84-4ZM5.76 12c0 3.31 2.582 6 5.76 6v-3l3.84 4-3.84 4v-3c-4.243 0-7.68-3.58-7.68-8 0-1.57.442-3.03 1.19-4.26L6.432 9.2A6.064 6.064 0 0 0 5.76 12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

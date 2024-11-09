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
      d="M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-6 14v2h-2v-2h2Zm1.17-4.83.9-.92c.57-.57.93-1.37.93-2.25 0-2.21-1.79-4-4-4S8 5.79 8 8h2c0-1.1.9-2 2-2s2 .9 2 2c0 .55-.22 1.05-.59 1.41l-1.24 1.26C11.45 11.4 11 12.4 11 13.5v.5h2c0-1.5.45-2.1 1.17-2.83Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

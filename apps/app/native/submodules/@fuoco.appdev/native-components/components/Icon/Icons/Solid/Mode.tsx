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
      d="M20.71 5.63c.39.39.39 1.02 0 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a.996.996 0 0 1 1.41 0l2.34 2.34ZM3 21v-3.75L14.06 6.19l3.75 3.75L6.75 21H3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

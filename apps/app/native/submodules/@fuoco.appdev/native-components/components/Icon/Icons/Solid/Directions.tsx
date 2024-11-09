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
      d="m12.71 2.29 9 9c.39.4.39 1.03 0 1.41l-9 9a.996.996 0 0 1-1.41 0l-9-9a.996.996 0 0 1 0-1.41l9-9a.996.996 0 0 1 1.41 0ZM14 12v2.5l3.5-3.5L14 7.5V10H9c-.55 0-1 .45-1 1v4h2v-3h4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

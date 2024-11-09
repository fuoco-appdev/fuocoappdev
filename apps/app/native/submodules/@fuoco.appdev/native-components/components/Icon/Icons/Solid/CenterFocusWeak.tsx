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
      d="M9 5H5v4H3V5c0-1.1.9-2 2-2h4v2ZM3 15h2v4h4v2H5c-1.1 0-2-.9-2-2v-4ZM19 3h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm-4 16h4v-4h2v4c0 1.1-.9 2-2 2h-4v-2ZM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm-2 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

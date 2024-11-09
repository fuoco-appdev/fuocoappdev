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
      d="M9 5H5v4H3V5c0-1.1.9-2 2-2h4v2Zm3 3c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM19 3h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm-4 16h4v-4h2v4c0 1.1-.9 2-2 2h-4v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

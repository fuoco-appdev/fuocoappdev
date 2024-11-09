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
      d="M2 4v4h20V4H2Zm20 16H2v-4h20v4ZM6 17H4v2h2v-2ZM4 7h2V5H4v2Zm-2 7h20v-4H2v4Zm4-3H4v2h2v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

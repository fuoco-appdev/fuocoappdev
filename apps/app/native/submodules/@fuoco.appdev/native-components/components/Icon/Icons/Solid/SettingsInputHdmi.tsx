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
      d="M18 4v3h1v6l-3 6v3H8v-3l-3-6V7h1V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2Zm-2 0H8v3h2V5h1v2h2V5h1v2h2V4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

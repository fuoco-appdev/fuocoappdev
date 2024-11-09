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
      d="M13 13h3l-4 4-4-4h3V3h2v10Zm-9 8v-2h16v2H4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

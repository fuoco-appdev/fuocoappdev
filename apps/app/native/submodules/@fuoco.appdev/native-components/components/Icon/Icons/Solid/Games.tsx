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
      d="M15 2v5.5l-3 3-3-3V2h6ZM2 9h5.5l3 3-3 3H2V9Zm7 7.5V22h6v-5.5l-3-3-3 3ZM22 15h-5.5l-3-3 3-3H22v6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

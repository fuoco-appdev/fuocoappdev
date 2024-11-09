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
      d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-4 4 .01-18c0-1.1.89-2 1.99-2Zm2 12h12v-2H6v2Zm12-3H6V9h12v2ZM6 8h12V6H6v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

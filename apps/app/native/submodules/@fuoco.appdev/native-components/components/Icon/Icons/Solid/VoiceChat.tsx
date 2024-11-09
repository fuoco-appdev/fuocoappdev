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
      d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-4 4 .01-18c0-1.1.89-2 1.99-2Zm10 8.8 4 3.2V6l-4 3.2V6H6v8h8v-3.2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

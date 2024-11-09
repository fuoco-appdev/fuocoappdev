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
      d="M16 .01 8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99ZM9 24v-2H7v2h2Zm2 0h2v-2h-2v2Zm4 0v-2h2v2h-2Zm-7-8h8V4H8v12Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

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
      d="M18 2.01 6 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99ZM18 20H6v-9.02h12V20ZM6 9h12V4H6v5Zm2-4h2v3H8V5Zm2 7H8v5h2v-5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

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
      d="M20 4v4.69L23.31 12 20 15.31V20h-4.69L12 23.31 8.69 20H4v-4.69L.69 12 4 8.69V4h4.69L12 .69 15.31 4H20ZM9.5 17.45c.76.35 1.61.55 2.5.55 3.31 0 6-2.69 6-6s-2.69-6-6-6c-.89 0-1.74.2-2.5.55C11.56 7.5 13 9.58 13 12c0 2.42-1.44 4.5-3.5 5.45Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

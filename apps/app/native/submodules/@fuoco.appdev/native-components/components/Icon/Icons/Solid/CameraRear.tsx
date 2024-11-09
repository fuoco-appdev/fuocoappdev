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
      d="M17 0H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h3v2H5v2h5v2l3-3-3-3h7c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm2 22h-5v-2h5v2ZM10 4a2 2 0 0 0 2 2c1.1 0 2-.9 1.99-2 0-1.1-.9-2-2-2S10 2.9 10 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

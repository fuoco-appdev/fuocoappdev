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
      d="M17 0H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h3v2H5v2h5v2l3-3-3-3h7c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm-3 6c0 1.1-.9 2-2 2s-1.99-.9-1.99-2S10.9 4 12 4s2 .9 2 2Zm0 16h5v-2h-5v2Zm3-20H7v10.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

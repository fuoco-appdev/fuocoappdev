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
      d="M11 2c-1.11 0-2 .89-2 2 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-1.11-.89-2-2-2Zm3 8c1.17.49 1.99 1.66 2 3v4h-3v5h-3v-5H8v-7c0-1.66 1.34-3 3-3s3 1.34 3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

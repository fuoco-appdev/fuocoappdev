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
      d="M15 11c0 1.66-1.34 3-3 3s-3-1.34-3-3V5c0-1.66 1.34-3 3-3s3 1.34 3 3v6Zm-3 5c2.76 0 5-2.24 5-5h2c0 3.53-2.61 6.43-6 6.92V21h-2v-3.08c-3.39-.49-6-3.39-6-6.92h2c0 2.76 2.24 5 5 5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

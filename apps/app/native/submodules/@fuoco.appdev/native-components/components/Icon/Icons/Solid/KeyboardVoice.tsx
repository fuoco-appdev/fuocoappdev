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
      d="M14.99 12c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3s3 1.34 3 3l-.01 6ZM12 17.1c2.76 0 5.3-2.1 5.3-5.1H19c0 3.42-2.72 6.24-6 6.72V22h-2v-3.28c-3.28-.49-6-3.3-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

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
      d="M20 3H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2Zm0 18h-3V10h5v9c0 1.1-.9 2-2 2Zm-5-10.98h-5V21h5V10.02ZM5 21c-1.1 0-2-.9-2-2v-9h5v11H5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

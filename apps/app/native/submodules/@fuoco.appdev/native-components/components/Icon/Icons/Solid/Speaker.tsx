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
      d="M7 2h10c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2l-10-.01c-1.1 0-2-.89-2-1.99V4c0-1.1.9-2 2-2Zm7 4a2 2 0 1 0-4.001-.001A2 2 0 0 0 14 6Zm-2 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm-3-5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

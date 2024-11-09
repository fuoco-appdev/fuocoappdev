import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m6.355 18.78.25 2.22 1.62-1.54 2.77-7.6c-.68-.17-1.28-.51-1.77-.98l-2.87 7.9Z" />
    <Path d="M14.765 10.88c-.49.47-1.1.81-1.77.98l2.77 7.6 1.62 1.54.26-2.22-2.88-7.9Z" />
    <Path d="M14.995 8c0-1.3-.84-2.4-2-2.82V3h-2v2.18c-1.16.42-2 1.52-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3Zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z" />
  </Svg>
)

export default Icon

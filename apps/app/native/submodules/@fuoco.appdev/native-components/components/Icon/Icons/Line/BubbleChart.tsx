import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M6.5 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm8.01-1c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3Zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1ZM16 3a5.51 5.51 0 0 0-5.5 5.5c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5S19.03 3 16 3Zm0 9c-1.93 0-3.5-1.57-3.5-3.5S14.07 5 16 5s3.5 1.57 3.5 3.5S17.93 12 16 12Z" />
  </Svg>
)

export default Icon

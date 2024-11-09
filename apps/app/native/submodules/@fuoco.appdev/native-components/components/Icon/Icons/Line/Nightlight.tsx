import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 4c.34 0 .68.02 1.01.07A11.995 11.995 0 0 0 12.5 12c0 2.95 1.1 5.77 3.01 7.93-.33.05-.67.07-1.01.07-4.41 0-8-3.59-8-8s3.59-8 8-8Zm0-2c-5.52 0-10 4.48-10 10s4.48 10 10 10c1.82 0 3.53-.5 5-1.35-2.99-1.73-5-4.95-5-8.65s2.01-6.92 5-8.65a9.973 9.973 0 0 0-5-1.35Z" />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 6.5C14.5 5.66 16 4 16 4s1.5 1.66 1.5 2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5Zm4 8.5a2.5 2.5 0 0 0 2.5-2.5c0-1.67-2.5-4.5-2.5-4.5S16 10.83 16 12.5a2.5 2.5 0 0 0 2.5 2.5ZM12 14h-2v-2H8v2H6v2h2v2h2v-2h2v-2Zm3-2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-8c0-2.97 2.16-5.43 5-5.91V4H6V2h6c1.13 0 2.15.39 2.99 1.01l-1.43 1.43C13.1 4.17 12.57 4 12 4h-2v2.09c2.84.48 5 2.94 5 5.91Zm-2 0c0-2.21-1.79-4-4-4s-4 1.79-4 4v8h8v-8Z" />
  </Svg>
)

export default Icon

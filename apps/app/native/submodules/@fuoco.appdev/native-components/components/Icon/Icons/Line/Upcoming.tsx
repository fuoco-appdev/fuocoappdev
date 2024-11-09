import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.6 10.81 16.19 9.4l3.56-3.55 1.41 1.41c-.11.03-3.56 3.55-3.56 3.55ZM13 3h-2v5h2V3Zm-6.6 7.81L7.81 9.4 4.26 5.84 2.84 7.26c.11.03 3.56 3.55 3.56 3.55ZM20 14h-3.42c-.77 1.76-2.54 3-4.58 3s-3.81-1.24-4.58-3H4v5h16v-5Zm0-2c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2h5c0 1.66 1.34 3 3 3s3-1.34 3-3h5Z" />
  </Svg>
)

export default Icon

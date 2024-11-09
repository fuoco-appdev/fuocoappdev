import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M4.5 6h2v3h10V6h2v6h2V6c0-1.1-.9-2-2-2h-4.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2H4.5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2h-5V6Zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Z" />
    <Path d="m17.51 14-1.42 1.41 1.58 1.58H11.5v2h6.17l-1.58 1.59 1.42 1.41 3.99-4L17.51 14Z" />
  </Svg>
)

export default Icon

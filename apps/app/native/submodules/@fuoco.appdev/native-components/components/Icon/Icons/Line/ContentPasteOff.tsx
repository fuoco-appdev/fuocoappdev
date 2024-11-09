import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21.9 21.385 3.52 3.005 2.1 4.415l1.61 1.61v13.17c0 1.1.9 2 2 2h13.17l1.61 1.61 1.41-1.42Zm-16.19-2.19V8.025l11.17 11.17H5.71Zm12-11v-3h2v11.17l2 2V5.195c0-1.1-.9-2-2-2h-4.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2H6.54l5 5h6.17Zm-5-5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Z" />
  </Svg>
)

export default Icon

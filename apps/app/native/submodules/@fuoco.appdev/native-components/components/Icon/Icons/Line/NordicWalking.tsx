import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19.5 22.75H18v-9h1.5v9Zm-11.47-9H6.5l-2 9h1.53l2-9ZM14 5.25c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm-3.7 3.4-2.8 14.1h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6a2.145 2.145 0 0 0-2.65-.84L6.5 8.05v4.7h2v-3.4l1.8-.7Z" />
  </Svg>
)

export default Icon

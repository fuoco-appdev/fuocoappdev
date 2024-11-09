import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.5 20.5h-14v-14h9v-2h-9c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9Zm-7.79-3.17-1.96-2.36L5 18.5h11l-3.54-4.71-2.75 3.54ZM19.5 4.5v-3h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6.5h3v-2h-3Z" />
  </Svg>
)

export default Icon

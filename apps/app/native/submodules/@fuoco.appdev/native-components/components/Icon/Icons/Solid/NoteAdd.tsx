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
      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6Zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2ZM13 3.5V9h5.5L13 3.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

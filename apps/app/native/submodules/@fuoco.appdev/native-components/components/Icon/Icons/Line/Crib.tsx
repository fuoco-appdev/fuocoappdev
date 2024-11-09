import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18 8h-6V3H8C5.79 3 4 4.79 4 7v6c0 1.1.9 2 2 2h2v2.93c-.61-.35-1.16-.78-1.65-1.27l-1.42 1.42C6.74 19.88 9.24 21 12 21c2.76 0 5.26-1.12 7.07-2.93l-1.42-1.42c-.49.49-1.05.92-1.65 1.27V15h2c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2Zm-4 10.75c-.64.16-1.31.25-2 .25s-1.36-.09-2-.25V15h4v3.75ZM18 13H6V7c0-1.1.9-2 2-2h2v5h8v3Z" />
  </Svg>
)

export default Icon

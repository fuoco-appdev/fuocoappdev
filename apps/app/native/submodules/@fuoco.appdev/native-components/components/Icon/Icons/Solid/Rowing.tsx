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
      d="M15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM8.5 14.5 4 19l1.5 1.5L9 17h2l-2.5-2.5ZM18 24l3-2.99L18 18h-1.5l-6.29-6.29c.86-.37 1.66-.87 2.29-1.39v2.27l3.58 3.58c.57-.55.92-1.32.92-2.16V8.26c0-1.24-1.01-2.25-2.25-2.26h-.03c-.34 0-.67.09-.96.23-.26.12-.5.29-.69.5l-1.4 1.55C10.61 9.45 8.66 10.35 7 10.32v2.16c.3 0 .6-.02.91-.07l7.1 7.09v1.49L18 24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

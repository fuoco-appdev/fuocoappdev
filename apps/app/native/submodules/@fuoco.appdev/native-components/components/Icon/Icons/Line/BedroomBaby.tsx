import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.94 14.04c-.34.34-.71.64-1.1.92L16 13.5V11h1v-1h-5.62L9.65 7H6l1 .76L5.5 9.5l.95 1L8 9.51v3.99l-.84 1.46c-.39-.27-.76-.58-1.1-.92L5 15.1a9.842 9.842 0 0 0 7 2.9c2.64 0 5.13-1.03 7-2.9l-1.06-1.06Zm-9.49 1.67.03-.06.81-1.41c1.74.65 3.66.65 5.4 0l.81 1.41.03.06c-1.1.51-2.3.79-3.55.79s-2.43-.27-3.53-.79ZM20 4v16H4V4h16Zm0-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Z" />
  </Svg>
)

export default Icon

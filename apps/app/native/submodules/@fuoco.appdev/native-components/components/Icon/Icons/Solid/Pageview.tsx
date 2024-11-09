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
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-8.5 5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5Zm2.38 6.3 2.91 2.91 1.42-1.42-2.91-2.9c.44-.7.7-1.51.7-2.39C16 9.01 13.99 7 11.5 7S7 9.01 7 11.5 9.01 16 11.49 16c.88 0 1.7-.26 2.39-.7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

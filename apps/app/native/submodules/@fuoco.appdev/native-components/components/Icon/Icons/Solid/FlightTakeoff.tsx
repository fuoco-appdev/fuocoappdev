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
      d="M20.23 8.58c.8-.22 1.63.26 1.84 1.06.21.8-.26 1.62-1.07 1.85L4.43 15.92l-.77-1.33-1.82-3.16 1.45-.39 1.97 1.54 4.97-1.33-4.14-7.17 1.93-.51 6.9 6.43 5.31-1.42ZM21.5 19h-19v2h19v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

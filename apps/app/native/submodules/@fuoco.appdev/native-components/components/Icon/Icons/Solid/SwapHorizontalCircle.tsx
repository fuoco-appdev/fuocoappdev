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
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10Zm-7-5.5 3.5 3.5-3.5 3.5V11h-4V9h4V6.5ZM5.5 14 9 17.5V15h4v-2H9v-2.5L5.5 14Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

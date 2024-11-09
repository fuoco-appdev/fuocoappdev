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
      d="m17.98 6.66-2.83 2.83-5.66-5.66L12.32 1l5.66 5.66ZM8.07 5.24 5.24 8.07l14.14 14.14 2.83-2.83L8.07 5.24ZM13 21H1v2h12v-2Zm-3.51-5.86L3.83 9.48 1 12.31l5.66 5.66 2.83-2.83Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

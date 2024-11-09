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
      d="M15 2.05v4.81c1.79 1.04 3 2.97 3 5.19 0 3.31-2.69 6-6 6s-6-2.69-6-6C6 9.83 7.21 7.9 9 6.86V2.05h6Zm-11 9H1v2h3v-2Zm.96 9.45-1.41-1.41 1.79-1.8 1.41 1.41-1.79 1.8Zm8.04-.45V23h-2v-2.95h2Zm7-7h3v-2h-3v2Zm-.97 7.46-1.79-1.8 1.4-1.4 1.8 1.79-1.41 1.41Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11.93 5.565 5.74 4.47-1.89 1.47 1.43 1.42 3.72-2.89-9-7-2.59 2.02 1.42 1.42 1.17-.91Zm9 9.54-1.63-1.27-.67.52 1.43 1.43.87-.68ZM3.34 1.895l-1.41 1.41 4.22 4.22-3.22 2.51 9 7 2.1-1.63 1.42 1.42-3.53 2.75-7.37-5.73-1.62 1.26 9 7 4.95-3.85 3.78 3.78 1.41-1.41L3.34 1.895Zm8.59 12.61-5.74-4.47 1.39-1.08 5.02 5.02-.67.53Z" />
  </Svg>
)

export default Icon

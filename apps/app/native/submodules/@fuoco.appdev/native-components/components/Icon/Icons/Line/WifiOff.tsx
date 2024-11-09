import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m21 12.17 2-2c-3.73-3.73-8.87-5.15-13.7-4.31l2.58 2.58c3.3-.02 6.61 1.22 9.12 3.73Zm-2 2a9.895 9.895 0 0 0-3.72-2.33l3.02 3.02.7-.69Zm-10 4 3 3 3-3a4.237 4.237 0 0 0-6 0ZM3.41 2.81 2 4.22l3.05 3.05C3.59 8 2.22 8.96 1 10.17l2 2a12.65 12.65 0 0 1 4.17-2.78l2.24 2.24A9.823 9.823 0 0 0 5 14.17l2 2a6.999 6.999 0 0 1 4.89-2.06l7.08 7.08 1.41-1.41L3.41 2.81Z" />
  </Svg>
)

export default Icon

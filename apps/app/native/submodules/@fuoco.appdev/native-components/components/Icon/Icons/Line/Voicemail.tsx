import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M18.5 6.5C15.46 6.5 13 8.96 13 12c0 1.33.47 2.55 1.26 3.5H9.74c.79-.95 1.26-2.17 1.26-3.5 0-3.04-2.46-5.5-5.5-5.5S0 8.96 0 12s2.46 5.5 5.5 5.5h13c3.04 0 5.5-2.46 5.5-5.5s-2.46-5.5-5.5-5.5Zm-13 9C3.57 15.5 2 13.93 2 12s1.57-3.5 3.5-3.5S9 10.07 9 12s-1.57 3.5-3.5 3.5Zm13 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5S22 10.07 22 12s-1.57 3.5-3.5 3.5Z" />
  </Svg>
)

export default Icon
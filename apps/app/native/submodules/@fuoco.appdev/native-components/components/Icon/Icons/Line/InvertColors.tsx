import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 5.31V19.5c-3.31 0-6-2.63-6-5.87 0-1.56.62-3.03 1.75-4.14L12 5.31Zm0-2.81L6.35 8.06C4.9 9.49 4 11.46 4 13.63c0 4.35 3.58 7.87 8 7.87s8-3.52 8-7.87c0-2.17-.9-4.14-2.35-5.57L12 2.5Z" />
  </Svg>
)

export default Icon

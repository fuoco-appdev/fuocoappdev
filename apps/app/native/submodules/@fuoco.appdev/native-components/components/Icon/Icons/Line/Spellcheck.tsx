import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M11.72 15.25h2.09l-5.11-13H6.84l-5.11 13h2.09l1.12-3h5.64l1.14 3Zm-6.02-5 2.07-5.52 2.07 5.52H5.7Zm15.16.59-8.09 8.09-3.67-3.68-1.41 1.41 5.09 5.09 9.49-9.5-1.41-1.41Z" />
  </Svg>
)

export default Icon

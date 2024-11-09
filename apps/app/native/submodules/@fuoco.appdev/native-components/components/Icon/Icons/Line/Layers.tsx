import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11.99 19.005-7.37-5.73L3 14.535l9 7 9-7-1.63-1.27-7.38 5.74Zm.01-2.54 7.36-5.73L21 9.465l-9-7-9 7 1.63 1.27 7.37 5.73Zm0-11.47 5.74 4.47-5.74 4.47-5.74-4.47L12 4.995Z" />
  </Svg>
)

export default Icon

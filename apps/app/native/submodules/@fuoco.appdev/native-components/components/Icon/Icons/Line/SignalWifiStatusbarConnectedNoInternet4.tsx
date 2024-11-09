import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.54 3.5c-4.69 0-8.93 1.9-12 4.98l12 12.02 5-5.01V7.5h5.92c-2.95-2.49-6.76-4-10.92-4Z" />
    <Path d="M21.54 17.5h-2v2h2v-2Z" />
    <Path d="M21.54 9.5h-2v6h2v-6Z" />
  </Svg>
)

export default Icon

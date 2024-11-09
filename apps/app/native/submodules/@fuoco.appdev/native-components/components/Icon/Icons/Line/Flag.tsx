import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m11.86 5.5.4 2h5.24v6h-3.36l-.4-2H6.5v-6h5.36Zm1.64-2h-9v17h2v-7h5.6l.4 2h7v-10h-5.6l-.4-2Z" />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m17.505 5.09-2.79-2.8h7v7l-2.79-2.8-4.09 4.09-1.41-1.41 4.08-4.08Zm2.21 6.2v4.17l2 2v-6.17h-2Zm.78 10.61-1.61-1.61H5.715a2 2 0 0 1-2-2V5.12l-1.61-1.61 1.41-1.41 18.38 18.38-1.4 1.42Zm-3.61-3.61-4.88-4.88-1.59 1.59-1.41-1.41 1.59-1.59-4.88-4.88v11.17h11.17Zm-8.34-14h4.17v-2h-6.17l2 2Z" />
  </Svg>
)

export default Icon

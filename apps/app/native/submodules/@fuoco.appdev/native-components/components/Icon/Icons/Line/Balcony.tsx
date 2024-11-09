import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M10 10v2H8v-2h2Zm6 2v-2h-2v2h2Zm5 2v8H3v-8h1v-4c0-4.42 3.58-8 8-8s8 3.58 8 8v4h1ZM7 16H5v4h2v-4Zm4 0H9v4h2v-4Zm0-11.92C8.16 4.56 6 7.03 6 10v4h5V4.08ZM13 14h5v-4c0-2.97-2.16-5.44-5-5.92V14Zm2 2h-2v4h2v-4Zm4 0h-2v4h2v-4Z" />
  </Svg>
)

export default Icon

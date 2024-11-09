import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v10c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16V6H5V2ZM4 17c-.55 0-1-.45-1-1v-2h2v2c0 .55-.45 1-1 1Zm-1-5V8h2v4H3ZM13 2c0-.55-.45-1-1-1s-1 .45-1 1v4H9v10c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.42 2-1.52 2-2.82V6h-2V2Zm-1 15c-.55 0-1-.45-1-1v-2h2v2c0 .55-.45 1-1 1Zm-1-5V8h2v4h-2Zm10-6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v10c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.42 2-1.52 2-2.82V6h-2Zm-1 11c-.55 0-1-.45-1-1v-2h2v2c0 .55-.45 1-1 1Zm-1-5V8h2v4h-2Z" />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M1.16 20.845h15.01v.98c0 .56-.45 1.01-1.01 1.01H2.17c-.56 0-1.01-.45-1.01-1.01v-.98Zm19.49 2.31-4.49-4.48v.17h-15v-2h13.17l-2-2H1.16c0-3.24 2.46-5.17 5.38-5.79l-5.7-5.7 1.42-1.41 19.8 19.8-1.41 1.41Zm-10.32-10.31-2-2c-1.42.06-3.52.56-4.55 2h6.55Zm12.83-8h-5v-4h-2v4h-5l.23 2h9.56l-1 9.97 1.83 1.83 1.38-13.8Z" />
  </Svg>
)

export default Icon

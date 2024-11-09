import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2.999 17.25V21h3.75l11.06-11.06-3.75-3.75-11.06 11.06ZM5.919 19h-.92v-.92l9.06-9.06.92.92L5.919 19Zm14.79-13.37-2.34-2.34c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41Z" />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M4.05 4.72C6.78 4.24 9.27 4 12 4c2.73 0 5.22.24 7.95.73l.93.16.25.89c.58 2.07.87 4.15.87 6.22 0 2.07-.29 4.15-.87 6.23l-.25.89-.93.16c-2.73.48-5.22.72-7.95.72-2.73 0-5.22-.24-7.95-.73l-.93-.16-.25-.89C2.29 16.15 2 14.07 2 12c0-2.07.29-4.15.87-6.22l.25-.9.93-.16Zm15.24 1.92C16.71 6.2 14.45 6 12 6s-4.71.2-7.29.64A21 21 0 0 0 4 12a21 21 0 0 0 .71 5.36c2.58.44 4.84.64 7.29.64s4.71-.2 7.29-.64A21 21 0 0 0 20 12a21 21 0 0 0-.71-5.36Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M21 9.52c0 1.09-.89 1.98-1.98 1.98H18V9.36c1.72-.44 3-1.99 3-3.84V5.5l-2 .02c0 1.09-.89 1.98-1.98 1.98h-.52l-4.5-6-4.5 6h-.52C5.89 7.5 5 6.61 5 5.52H3c0 1.86 1.28 3.4 3 3.84v2.14H4.98C3.89 11.5 3 10.61 3 9.52H1c0 1.86 1.28 3.4 3 3.84v9.14h7v-4c0-.55.45-1 1-1s1 .45 1 1v4h7v-9.14c1.72-.44 3-1.99 3-3.84V9.5l-2 .02Zm-9-4.69 2 2.67h-4l2-2.67ZM8 9.5h8v2H8v-2Zm10 11h-3v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2H6v-7h12v7Z" />
  </Svg>
)

export default Icon

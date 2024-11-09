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
      d="m10 2 5.71 5.71-4.3 4.29 4.3 4.29L10 22H9v-7.59L4.41 19 3 17.59 8.59 12 3 6.41 4.41 5 9 9.59V2h1Zm9.53 4.71-1.26 1.26c.63 1.21.98 2.57.98 4.02 0 1.45-.36 2.82-.98 4.02l1.2 1.2a9.936 9.936 0 0 0 1.54-5.31c-.01-1.89-.55-3.67-1.48-5.19Zm-5.29 5.3 2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32ZM11 5.83l1.88 1.88L11 9.59V5.83Zm0 12.34 1.88-1.88L11 14.41v3.76Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

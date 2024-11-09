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
      d="m10.22 4.66 2.36-2.36 2.36 2.36h-4.72Zm4.69 14.71-2.33 2.33-2.33-2.33h4.66ZM1.6 17.73 6.1 6.27h1.64l4.49 11.46h-1.84l-.92-2.45H4.36l-.92 2.45H1.6Zm3.37-4.09 1.94-5.18 1.94 5.18H4.97Zm16.88 2.5h-6.12l5.93-8.6V6.28h-8.3v1.6h5.88l-5.92 8.56v1.29h8.53v-1.59Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

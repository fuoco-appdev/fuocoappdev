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
      d="M2 12C2 6.47 6.47 2 12 2c5.52 0 10 4.48 10 10s-4.47 10-10 10S2 17.53 2 12Zm7.25-2.12c0-.92 1.84-1.38 2.75-1.38.91 0 2.75.47 2.75 1.38v4.62h-1.5V19h-2.5v-4.5h-1.5V9.88ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm1.5-13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

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
      d="M8.27 3h7.46L21 8.27v7.46L15.73 21H8.27L3 15.73V8.27L8.27 3Zm6.63 16 4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8L9.1 19h5.8ZM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-10h-2v7h2V7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

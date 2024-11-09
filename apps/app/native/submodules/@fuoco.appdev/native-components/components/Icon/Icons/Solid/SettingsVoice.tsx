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
      d="M12 13c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3ZM7 24h2v-2H7v2Zm6-2v2h-2v-2h2Zm2 2h2v-2h-2v2Zm2.3-14H19c0 3.41-2.72 6.23-6 6.72V20h-2v-3.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1s5.3-2.1 5.3-5.1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

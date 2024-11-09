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
      d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2ZM5.5 10.5h2v1h-2v-1Zm2 2.5c.85 0 1.5-.65 1.5-1.5v-1C9 9.65 8.35 9 7.5 9H4v6h1.5v-2h2Zm5 2H11V9h1.5v6Zm6.3 0H20V9h-1.25v3.5L16.25 9H15v6h1.25v-3.5L18.8 15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

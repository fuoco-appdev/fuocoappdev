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
      d="m1 2.99 1.41-1.41 20.01 20.01L21.01 23l-3.64-3.64L15.73 21H8.27L3 15.73V8.27l1.64-1.64L1 2.99ZM13 7h-2v.33L7.47 3.8l.8-.8h7.46L21 8.27v7.46l-.8.8-7.2-7.2V7Zm-2 5.99.01.01H11v-.01ZM10.7 16c0 .72.58 1.3 1.3 1.3.72 0 1.3-.58 1.3-1.3 0-.72-.58-1.3-1.3-1.3-.72 0-1.3.58-1.3 1.3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8 18.5h10v1c0 1.1-.9 2-2 2h-6c-1.1 0-2-.9-2-2v-1Zm0-1h10v-5H8v5Zm10-15v6l-3.15-.66c-.01 0-.01.01-.02.02 1.55.62 2.72 1.98 3.07 3.64H8.1c.34-1.66 1.52-3.02 3.07-3.64-.33-.26-.6-.58-.8-.95L6 6V5l4.37-.91c.5-.94 1.49-1.59 2.63-1.59.7 0 1.34.25 1.85.66L18 2.5Zm-4 3c-.03-.59-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1Z" />
  </Svg>
)

export default Icon

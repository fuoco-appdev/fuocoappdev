import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m7.1 7-3.2 9h1.9l.7-2h3.2l.7 2h1.9L9.1 7h-2Zm-.15 5.65L8.1 9l1.15 3.65h-2.3ZM22.1 7l-1.2 6.29L19.4 7h-1.6l-1.49 6.29L15.1 7h-.76l-.01.01C12.86 5.18 10.63 4 8.1 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c2.96 0 5.55-1.61 6.93-4 .03-.06.05-.12.08-.18.05-.08.09-.17.14-.25l.1.43h1.75l1.5-6.1 1.5 6.1h1.75l2.05-9h-1.8Zm-8.63 7.67C12.48 16.64 10.45 18 8.1 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 .96-.23 1.86-.63 2.67Z" />
  </Svg>
)

export default Icon

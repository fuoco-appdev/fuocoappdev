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
      d="M21 17.88V7H10.12l-2-2h2.46L7.3 1.7 8 1l4 4 4-4 .71.7L13.42 5H21c1.11 0 2 .89 2 2v12c0 .26-.06.5-.15.73L21 17.88Zm.72 3.85L20.46 23v-.01l1.26-1.26ZM2.41 2.13l-.14.14L1 3.54l1.53 1.53C1.65 5.28 1 6.06 1 7v12c0 1.1.9 2 2 2h15.46l1.99 1.99 1.26-1.26.15-.15L2.41 2.13ZM3 7v12h13.46l-12-12H3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

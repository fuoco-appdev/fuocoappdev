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
      d="M19 17v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2Zm-7 6c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99Zm1-9.99h3V11h-3V8h-2v3H8v2.01h3v3h2v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

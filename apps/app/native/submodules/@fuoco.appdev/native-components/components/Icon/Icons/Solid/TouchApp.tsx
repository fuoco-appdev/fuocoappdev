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
      d="M9 7.5v3.74c-1.21-.81-2-2.18-2-3.74C7 5.01 9.01 3 11.5 3S16 5.01 16 7.5c0 1.56-.79 2.93-2 3.74V7.5a2.5 2.5 0 0 0-5 0Zm5.3 6.11 4.54 2.26c.53.22.91.76.91 1.38 0 .06-.01.13-.02.2l-.75 5.27c-.11.73-.69 1.28-1.44 1.28h-6.79c-.41 0-.79-.17-1.06-.44l-4.94-4.94.79-.8c.2-.2.48-.33.79-.33.06 0 .111.009.162.018.026.004.051.009.078.012l3.43.72V7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6h.76c.19 0 .37.04.54.11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

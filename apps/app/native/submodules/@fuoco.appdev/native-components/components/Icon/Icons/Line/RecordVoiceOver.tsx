import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 13.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H3ZM15.08 7.55c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27l-1.68 1.69Zm4.99-5.05-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74l1.63 1.63c3.9-3.89 3.91-9.95 0-14Z" />
  </Svg>
)

export default Icon

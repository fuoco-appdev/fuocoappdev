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
      d="M12 5.1v4.05l7.4 7.4c1.15-2.88.59-6.28-1.75-8.61L12 2.27 8.56 5.71l1.41 1.41L12 5.1Zm-7.6-.73L2.99 5.78l2.78 2.78a8.003 8.003 0 0 0 .57 10.68A7.98 7.98 0 0 0 12 21.58c1.78 0 3.56-.59 5.02-1.77l2.7 2.7 1.41-1.41L4.4 4.37Zm3.36 13.46A5.928 5.928 0 0 0 12 19.59v-4.8L7.21 10A5.907 5.907 0 0 0 6 13.59c0 1.6.62 3.1 1.76 4.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

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
      d="M10.5 3c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5Zm3.5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5ZM15 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 5.5-.2-.02c-.67-.09-1.19-.61-1.28-1.28l-.02-.2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm4-.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 4.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5ZM11 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7 18a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm7 2.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5Zm6.5-6.5c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5ZM3 13.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5Zm8 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5ZM9.5 21c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5ZM6 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-6.23-3.5-3.5 1.41-1.41 16.23 16.23-1.41 1.41h-.01l-3.78-3.78c.03.09.06.18.06.28 0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1c.1 0 .19.03.28.06l-2.81-2.81c-.11.71-.73 1.25-1.47 1.25-.83 0-1.5-.67-1.5-1.5 0-.74.54-1.36 1.25-1.47L6.94 9.72c.03.09.06.18.06.28 0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1l.28.05L6 8.77Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon

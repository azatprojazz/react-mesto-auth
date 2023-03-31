import { SpinnerCircularSplit } from 'spinners-react';

function Loader() {
  return (
    <SpinnerCircularSplit
      size={400}
      thickness={180}
      speed={300}
      color="rgba(172, 57, 57, 1)"
      secondaryColor="rgba(76, 57, 172, 0.92)"
      className="spinner"
    ></SpinnerCircularSplit>
  );
}

export default Loader;

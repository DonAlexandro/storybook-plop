import { useState } from 'react';
import { Button } from '../components';

function Home() {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>;
}

export default Home;

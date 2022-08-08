import { component$, useStore } from '@builder.io/qwik';
import styles from './counter.module.css';

export const Counter = component$(() => {
  const store = useStore({ count: 0 });

  return (
    <div className={styles.root}>
      <p>Count: {store.count}</p>
      <p>
        <button onClick$={() => store.count++}>Increment</button>
      </p>
    </div>
  );
});

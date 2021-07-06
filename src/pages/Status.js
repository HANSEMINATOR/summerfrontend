import React from 'react';

import { useSubscription } from 'mqtt-react-hooks';

export default function Status() {

  /* Message structure:
  *  topic: string
  *  message: string
  */
  const { message } = useSubscription(['telemetry/gokart1/voltage','telemetry/gokart1/amps']);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          {message}
        </p>
      </div>
    </>
  );
}
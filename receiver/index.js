const kafka = require('kafka-node');

const KAFKA_SERVER_URL = 'localhost:2181';

const Consumer = kafka.Consumer;
const client = new kafka.Client(KAFKA_SERVER_URL);

consumer = new Consumer(client, [{ topic: 'message', partition: 0 }], {
  autoCommit: false
});

consumer.on('message', (message) => {
  console.log(message);
});

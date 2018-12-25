const express = require('express');
const kafka = require('kafka-node');

const KAFKA_SERVER_URL = 'localhost:2181';

const router = express.Router();
const Producer = kafka.Producer;
const Client = kafka.Client;

function sendMessage(req, res) {
  let client = new Client(KAFKA_SERVER_URL);
  let producer = new Producer(client, { requireAcks: 1 });

  const topic = 'message';
  const message = req.body;

  producer.on('ready', () => {
    producer.createTopics([topic], true, (err, topicCreated) => {
      if (err) {
        reject();
      }

      producer.send(
        [
          {
            topic: topic,
            partition: 0,
            messages: [JSON.stringify(message)],
            attributes: 0
          }
        ],
        (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      );
    });
  });

  producer.on('error', err => {
    res.status(500).json(err);
  });
}

router.post('/send', sendMessage);

module.exports = router;

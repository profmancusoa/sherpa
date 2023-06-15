# sherpa

> **Sherpa** is often referred by foreigners, as any guide or climbing supporter hired for mountaineering expeditions in the Himalayas. Sherpa carries and delivers, for you ,whatever you need to the top of the mountain, therefore making very easy or even possible for you climbing the mountain.

Same way sherpa file sharing make very easy to deliver files wherever you want

## Goals

- write it from scratch to be able to control any aspect of the service
- no beign particularly dependant on any other technology or service
- practice with TypeScript
- provide a simple to understand project for other people to experiment and learn
- provide low traffic and small size file sharing

Any support is more than welcome!!!


## DEV

- In development no particular attention is required
- Just run npm run dev

## PROUCTION

- I run sherpa behind a nginx reverse proxy
- In suche scenario be sure to increase client_max_body_size to the proper size to allow uploading of your file (es: **client_max_body_size** 100M;)
- run sherpa with those two env variables
  - BODY_SIZE_LIMIT=0 ORIGIN=https://<your domain>


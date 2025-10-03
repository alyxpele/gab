# gab

Prototype conversation webapp - with Tanstack Start, BaseUI and Tailwind.

The initial purpose of the application is to showcase the usage of modern libraries and frameworks,
latest react features, as well as my abilities and practices.

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/d5364049-ca01-42fd-af89-857185939dee/deploy-status)](https://app.netlify.com/projects/gab-project/deploys)

[Link to deployed app](https://gab-project.netlify.app/)

## Features

### General & Ideas

- [ ] Tests
- [ ] Proper deployment url
- [ ] WebSocket connection for chatroom details
- [ ] [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) / P2P for message sending
- [ ] Multi-Party encryption and decryption, private key makes uniqueID and ensure message origin's authenticity

### Server

- [ ] Auto-delete empty / inactive chatroom
- [ ] Limited messages in time and space (by design with P2P messaging)

### Client

- [ ] `<Activity />` enabled responsive panels
- [ ] `<Suspense />` and skeleton fallbacks
- [ ] `useOptimistic` on room create
- [ ] `useTransition`, and `<ViewTransition>`
- [ ] Anonymous account / user name set
- [ ] About Page

#### Chat list

- [ ] Filter with `useDeferredValue`
- [ ] Create Chatroom
- [ ] Live user-count per room

#### Message list

- [ ] Pseudo color by uniqueID

import {Machine, assign} from 'xstate'

export const BotMachine = Machine({
  initial: 'starting',
  context: {
    qrcode: '',
    userName: '',
  },
  states: {
    running: {
      on: {
        LOGOUT: 'starting',
        STOP: 'stopped',
      },
    },
    starting: {
      on: {
        LOGIN: {
          target: 'running',
          actions: assign({
            userName: (context, event) => event.userName,
          }),
        },
        SCAN: {
          actions: assign({
            qrcode: (context, event) => event.qrcode,
          }),
        },
      },
    },
    stopped: {
      entry: assign({
        qrcode: () => '',
        userName: () => '',
      }),
      on: {
        START: 'starting',
      },
    },
  },
})

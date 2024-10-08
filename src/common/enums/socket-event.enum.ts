export const SocketEvent = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    USERS: 'users',
    USERNAME: 'username',
    ROOMS: 'rooms',
    CREATE_ROOM: 'create-room',
    ERROR: 'error',
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
    MESSAGE: 'message'
} as const
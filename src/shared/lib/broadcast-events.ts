import { useEffect } from 'react'

export class BroadcastEvents<M> {
  private listeners: Set<(event: M) => void> = new Set()
  private broadcast: BroadcastChannel

  constructor(channel: string) {
    this.broadcast = new BroadcastChannel(channel)

    this.broadcast.onmessage = (message) => {
      this.listeners.forEach((listener) => listener(message.data))
    }
  }

  listen = (callback: (event: M) => void) => {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  emit = (event: M) => {
    this.broadcast.postMessage(event)
    this.listeners.forEach((listener) => listener(event))
  }

  useEvent = (listener: (event: M) => void) => {
    useEffect(() => {
      return this.listen(listener)
    }, [])
  }
}

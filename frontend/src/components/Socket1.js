import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3050/')


const Socket1 = () => {
    const [text, setText] = useState('')
    const [receivedMessage, setReceivedMessage] = useState('')

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setReceivedMessage(data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('send_message', text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter message' value={text} onChange={(e) => setText(e.target.value)} />
                <input type="submit" value='send' />
            </form>

            <h2>Received Message: {receivedMessage} </h2>

        </div>
    )
}

export default Socket1 
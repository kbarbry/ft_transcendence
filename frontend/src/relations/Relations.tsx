import React, { useState } from 'react'
import RequestsReceived from './RequestsReceived'
import RequestsSent from './RequestsSent'
import Blockeds from './Blockeds'
import Friends from './Friends'

const Relations: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Relations</h2>
          <ul>
            <li>
              <button onClick={() => handleItemClick('Friends')}>
                Friends
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('RequestsReceived')}>
                Requests Received
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('RequestsSent')}>
                Requests Sent
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('Blockeds')}>
                Blocked
              </button>
            </li>
          </ul>
        </div>
        <div>
          {selectedItem === 'Friends' && <Friends />}
          {selectedItem === 'RequestsReceived' && <RequestsReceived />}
          {selectedItem === 'RequestsSent' && <RequestsSent />}
          {selectedItem === 'Blockeds' && <Blockeds />}
        </div>
      </div>
    </>
  )
}

export default Relations

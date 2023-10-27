import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Items from './Items.js'

function App() {

  const [items, setItems] = useState([])
  const [receiptId, setReceiptId] = useState(null)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    // fetching the first set of collections data from the Library of Congress API
    const getItems = async () => {
      try {
        const listOfItems = await axios.get('http://localhost:3000/items')
        setItems(listOfItems.data)
      }
      catch(error) {
        console.log(error)
      }
    }
    getItems()
  }, []) 

  const getReceipt = async (list_of_purchases) => {
    const receipt = await axios.post('http://localhost:3000/receipts/process', {
      items_purchased: list_of_purchases
    })

    setReceiptId(receipt.data.id)
  }

  const getRewardPoints = async () => {
    const response = await axios.get(`http://localhost:3000/receipts/${receiptId}/points`)
    setPoints(response.data.points)
  }

  return (
    <div>
      <h1>Shopping Application</h1>
      <p>Add items to your cart, complete your purchase, and get rewards</p>
      <Items itemsForSale={items} getReceipt={getReceipt} receiptId={receiptId} points={points} getRewardPoints={getRewardPoints}/>

    </div>
  );
}

export default App;

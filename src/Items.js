import { useState } from 'react';

export default function Items({itemsForSale, getReceipt, receiptId, points, getRewardPoints}) {

    const [itemsAddedToCart, setItemsAddedToCart] = useState([]);

    const displayProducts = () => {
        return itemsForSale.map(item => {
            return <table>
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.short_description}</td>
                        <td>{item.price}</td>
                        <td className="add-button"><button onClick={() => addItemToCart(item)}>Add to Cart </button></td>
                    </tr>
                </tbody>
            </table>
        })
    }

    const displayShoppingCart = () => {
        if (itemsAddedToCart.length) {
            return itemsAddedToCart.map(item => {
                return <li>{item.short_description}</li>
            })
        }
        else {
            return <></>
        } 
    }

    const addItemToCart = (item) => {
        setItemsAddedToCart([...itemsAddedToCart, item])
    }

    const itemsAddedIds = () => {
        return itemsAddedToCart.map(item=> {
            return item.id
        })
    }

    const displaySuccessMessage = () => {
        if (receiptId) {
            return <div>
                <p>Thank you for your purchase!</p>
                <button onClick={() => getRewardPoints()}>See Your Total Reward Points</button>
                <p>Points: {points}</p>
            </div>
        }
    }

    return (
        <div>
            <div className="section-container">
                <h2>Products Available</h2>
                {displayProducts()}
            </div>
            <div>
            <h2>Shopping Cart</h2>
            <ul>
                {displayShoppingCart()}
            </ul>
            </div>
            <div><button onClick={() => getReceipt(itemsAddedIds())}>Complete Your Purchase</button></div>
            <br/>
            <strong>{displaySuccessMessage()}</strong>
        </div>
    )

}

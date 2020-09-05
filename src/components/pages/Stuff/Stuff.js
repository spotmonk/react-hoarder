import React from 'react';
import itemData from '../../../helpers/data/itemData';
import authData from '../../../helpers/data/authData';
import ItemCard from '../../shared/ItemCard';

class Stuff extends React.Component {
  state = {
    items: [],
  }

  getItems = () => {
    itemData.getItemsByUid(authData.getUid())
      .then((items) => this.setState({ items }))
      .catch((err) => console.error('failed to get items', err));
  }

  componentDidMount() {
    this.getItems();
  }

  deleteItem = (itemId) => {
    itemData.deleteItem(itemId)
      .then(() => this.getItems())
      .catch((err) => console.warn('could not delete', err));
  }

  render() {
    const { items } = this.state;
    const itemCards = items.map((item) => <ItemCard deleteItem={this.deleteItem} key={item.id} item={item}/>);

    return (
      <div>
        <h2>Check Out My Stuff!</h2>
        {itemCards}
      </div>
    );
  }
}

export default Stuff;

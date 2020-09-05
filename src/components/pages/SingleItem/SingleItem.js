import React from 'react';
import itemData from '../../../helpers/data/itemData';

class SingleItem extends React.Component {
  state = {
    item: {},
  }

  componentDidMount() {
    const { itemId } = this.props.match.params;

    itemData.getSingleItem(itemId)
      .then((res) => this.setState({ item: res.data }))
      .catch((err) => console.error('get single item failed', err));
  }

  render() {
    const { item } = this.state;

    return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={item.itemImage} className="card-img-top" alt={item.itemName} />
      <div className="card-body">
        <h5 className="card-title">{item.itemName}</h5>
        <p className="card-text">{item.itemDescription}</p>
      </div>
    </div>
    );
  }
}

export default SingleItem;

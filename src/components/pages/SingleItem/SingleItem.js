import React from 'react';
import { Link } from 'react-router-dom';
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

  deleteItemEvent = (e) => {
    e.preventDefault();
    const { item } = this.state;
    itemData.deleteItem(item.id)
      .then(() => this.props.history.push('/stuff'))
      .catch((err) => console.warn('could not delete', err));
  }

  render() {
    const { item } = this.state;
    const { itemId } = this.props.match.params;

    return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={item.itemImage} className="card-img-top" alt={item.itemName} />
      <div className="card-body">
        <h5 className="card-title">{item.itemName}</h5>
        <p className="card-text">{item.itemDescription}</p>
      </div>
      <div className="col-12">
      <Link to={`/edit/${itemId}`}><button className="btn btn-warning col-6">Edit</button></Link>
        <button className="btn btn-danger col-6" onClick={this.deleteItemEvent}>Delete</button>
      </div>
    </div>
    );
  }
}

export default SingleItem;

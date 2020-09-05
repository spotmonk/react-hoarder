import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  deleteItemEvent = (e) => {
    e.preventDefault();
    const { item, deleteItem } = this.props;
    deleteItem(item.id);
  }

  render() {
    const { item } = this.props;
    return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <Link to={`stuff/${item.id}`}><img src={item.itemImage} className="card-img-top" alt={item.itemName} /></Link>
      <div className="card-body">
        <h5 className="card-title">{item.itemName}</h5>
      </div>
      <div className="col-12">
      <Link to={`/edit/${item.id}`}><button className="btn btn-warning col-6">Edit</button></Link>
        <button className="btn btn-danger col-6" onClick={this.deleteItemEvent}>Delete</button>
      </div>
    </div>
    );
  }
}

export default ItemCard;

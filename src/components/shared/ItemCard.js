import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item } = this.props;
    return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <Link to={`stuff/${item.id}`}><img src={item.itemImage} className="card-img-top" alt={item.itemName} /></Link>
      <div className="card-body">
        <h5 className="card-title">{item.itemName}</h5>
      </div>
    </div>
    );
  }
}

export default ItemCard;

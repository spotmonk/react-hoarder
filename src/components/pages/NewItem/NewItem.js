import React from 'react';
import itemData from '../../../helpers/data/itemData';
import authData from '../../../helpers/data/authData';

class Home extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  changeItemNameEvent = (e) => {
    e.preventDefault();
    this.setState({ itemName: e.target.value });
  }

  changeItemImageEvent = (e) => {
    e.preventDefault();
    this.setState({ itemImage: e.target.value });
  }

  changeItemDescriptionEvent = (e) => {
    e.preventDefault();
    this.setState({ itemDescription: e.target.value });
  }

  saveItem = (e) => {
    e.preventDefault();
    const tempObj = {
      itemName: this.state.itemName,
      itemImage: this.state.itemImage,
      itemDescription: this.state.itemDescription,
      uid: authData.getUid(),
    };

    itemData.createItem(tempObj)
      .then(() => this.props.history.push('/stuff'))
      .catch((err) => console.error('failed to create', err));
  }

  render() {
    const { itemName, itemImage, itemDescription } = this.state;

    return (
      <div className="NewItem col-12">
        <h1>NewBirb</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={this.changeItemNameEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemImage">Item Image</label>
            <input
              type="text"
              className="form-control"
              id="itemImage"
              placeholder="Enter Item Image Url"
              value={itemImage}
              onChange={this.changeItemImageEvent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemDescription">Item Description</label>
            <input
              type="text"
              className="form-control"
              id="itemDescription"
              placeholder="Enter Item Description"
              value={itemDescription}
              onChange={this.changeItemDescriptionEvent}
            />
          </div>
          <button className="btn btn-warning" onClick={this.saveItem}>Save Item</button>
        </form>
      </div>
    );
  }
}

export default Home;

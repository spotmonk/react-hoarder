import React from 'react';
import itemData from '../../../helpers/data/itemData';
import authData from '../../../helpers/data/authData';

class Home extends React.Component {
  state = {
    itemId: '',
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  componentDidMount() {
    const { editId } = this.props.match.params;
    itemData.getSingleItem(editId)
      .then((res) => {
        const item = res.data;
        this.setState({
          itemId: this.props.match.params.editId,
          itemName: item.itemName,
          itemImage: item.itemImage,
          itemDescription: item.itemDescription,
        });
      })
      .catch((err) => console.error('get single item failed', err));
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
    itemData.updateItem(this.state.itemId, tempObj)
      .then((res) => this.props.history.push('/stuff'))
      .catch((err) => console.error('failed to create', err));
  }

  render() {
    const { itemName, itemImage, itemDescription } = this.state;

    return (
      <div className="NewItem col-12">
        <h1>Edit Item</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              placeholder={itemName}
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

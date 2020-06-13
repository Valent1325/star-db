import React, { Component } from 'react';

import ItemView from './components/item-view';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: false
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({ loading: true })

    // setTimeout эмуляция задержки от сервера
    setTimeout(() => {
      getData(itemId)
        .then((item) => {
          this.setState({
            item,
            image: getImageUrl(item.id),
            loading: false
          });
        })
        .catch(() => this.setState({ loading: false }));
    }, 1000);  
  }

  render() {

    const { item, image, loading } = this.state;

    if (!item && !loading) {
      return <span>Select person form a list </span>
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? 
      <ItemView  
        item={item}
        image={image}>
          {
            React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, { item });
            })
          }
      </ItemView> 
      : null;

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

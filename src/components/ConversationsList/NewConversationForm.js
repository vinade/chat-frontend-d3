import React from 'react';
import { API_ROOT, DEV_API_ROOT, HEADERS } from '../../constants/index';
import { Input, Icon } from 'semantic-ui-react'

let apiRoot;

if (process.env.NODE_ENV === 'development') {
    apiRoot = DEV_API_ROOT;
} else {
    apiRoot = API_ROOT;
}

class NewConversationForm extends React.Component {
  
  state = {
    title: ''
  }


  handleChange = e => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.submit();  
  }
  
  submit = () => {
    if(this.state.title.length > 0){
      fetch(`${apiRoot}/conversations`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(this.state)
      });
      this.setState({ title: '' });
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.submit();
    }
  }

  render = () => {
    return (
      <Input icon={<Icon name='plus' inverted circular link onClick={this.handleSubmit} />} 
        placeholder='Nova Conversa' value={this.state.title} fluid style={{ marginBottom: 20 }}
        onChange={this.handleChange} onKeyPress={this.handleKeyPress} />    
    );
  };
}

export default NewConversationForm;
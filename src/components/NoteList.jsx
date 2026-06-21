// NoteList.js
import React from 'react';
import NoteItem from './NoteItem';
//import PropTypes from 'prop-types';
import { List } from 'antd';

const NoteList = ({ note, onDelete }) => {
  return (
    <List
      dataSource={note}
      renderItem={(item) => <NoteItem key={item.id} note={item} onDelete={onDelete} />}
    />
  );
};

/*NoteList.propTypes = {
  note: PropTypes.arrayOf(PropTypes.object).isRequired,  // Fix the casing here
  onDelete: PropTypes.func.isRequired,  // Fix the casing here
}*/
export default NoteList;

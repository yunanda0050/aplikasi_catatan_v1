// NoteList.js
import React from 'react';
import NoteItem from './NoteItem';
import { List } from 'antd';

const NoteList = ({ note }) => {
  return (
    <List
      dataSource={note}
      renderItem={(item) => <NoteItem key={item.id} note={item} />}
    />
  );
};

export default NoteList;

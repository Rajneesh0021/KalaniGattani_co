// ChatsPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

// Styled Components
const ChatsContainer = styled.div`
  padding: 20px;
`;

const ChatList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ChatItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ChatActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #d32f2f;

  &:hover {
    opacity: 0.8;
  }
`;

// Dummy chat data
const chats = [
  { id: 1, message: 'Chat 1', date: '2024-09-19' },
  { id: 2, message: 'Chat 2', date: '2024-09-18' },
  { id: 3, message: 'Chat 3', date: '2024-09-17' },
];

const AdminChats = () => {
  const [chatList, setChatList] = useState(chats);

  const handleDeleteChat = (chatId) => {
    const updatedChats = chatList.filter((chat) => chat.id !== chatId);
    setChatList(updatedChats);
  };

  return (
    <ChatsContainer>
      <ChatList>
        {chatList.map((chat) => (
          <ChatItem key={chat.id}>
            <div>
              <strong>{chat.message}</strong>
              <p>{chat.date}</p>
            </div>
            <ChatActions>
              <ActionButton onClick={() => handleDeleteChat(chat.id)}>
                <FaTrash /> Delete
              </ActionButton>
            </ChatActions>
          </ChatItem>
        ))}
      </ChatList>
    </ChatsContainer>
  );
};

export default AdminChats;

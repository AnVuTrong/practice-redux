import React from 'react';
import { AIAgent } from '../../types/Chat.types';
import { AI_AGENTS } from '../../constants/Agents.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux.hook';
import { addNewChatWithAgent, toggleAgentSelector } from '../../features/ChatSlice.feature';

export const AgentSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.chat.isAgentSelectorOpen);

  if (!isOpen) return null;

  const handleAgentSelect = (agent: AIAgent) => {
    dispatch(addNewChatWithAgent({ agent }));
  };

  return (
    <div className='absolute right-0 top-full mt-2 w-56 rounded-md shadow-lg bg-background-primary border border-secondary z-50'>
      <div className='py-1 max-h-[300px] overflow-y-auto'>
        {AI_AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => handleAgentSelect(agent)}
            className='w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 transition-colors'>
            <span className='text-xl'>{agent.avatar}</span>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium text-primary truncate'>{agent.name}</p>
              <p className='text-xs text-text-secondary truncate'>{agent.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
